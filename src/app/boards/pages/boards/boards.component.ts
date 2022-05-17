import { Component, OnInit } from '@angular/core';
import { IBoard, ITask, IUser, Status } from 'src/app/core/models/api.models';
import { ApiServices } from 'src/app/core/services/api-services.service';
import { forkJoin, map, Observable, Subscription } from 'rxjs';
import { ApiFacade } from 'src/app/store/facade';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component';
import { __assign } from 'tslib';
interface ITaskSearch {
  boardId: string;
  boardName: string;
  tasks: ITask[];
}
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  searchStr: string = '';
  tasksResults: ITaskSearch[] = [];
  tasks: ITask[] = [];
  isResultsShown = false;
  isSeachingTasks = false;
  taskSearchInput: string = '';
  subs: Subscription | undefined;
  title: string = '';
  isLoading: Observable<boolean> = this.apiFacade.boardsLoadingStatus$;
  public users$: Observable<IUser[]> = this.apiFacade.users$;
  public users: IUser[] = [];

  public boards$: Observable<IBoard[]> = this.apiFacade.boards$.pipe(
    map((boards: IBoard[]) =>
      [...boards].sort((a, b) => a.title.localeCompare(b.title))
    )
  );
  constructor(
    private apiFacade: ApiFacade,
    public dialog: MatDialog,
    private apiService: ApiServices
  ) {}
  ngOnInit(): void {
    this.apiFacade.loadBoards();
    this.apiFacade.getUsers();
    this.users$.subscribe((data) => (this.users = data));
  }
  openDialog(id: string | null, e: Event): void {
    e.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { name: 'CONFIRMATION.BOARD', isConfirmed: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.deleteBoard(id);
    });
  }

  getTasks(boards: IBoard[]): Observable<ITaskSearch[]> {
    let observables: Observable<any>[] = [];
    boards.forEach((el) => {
      observables.push(
        this.apiService.getBoardById(el.id!).pipe(
          map((data) => {
            let tasks: ITask[] = [];
            data.columns?.forEach((column) => {
              column.tasks ? (tasks = tasks.concat(...column.tasks)) : null;
            });
            return { boardId: el.id, boardName: el.title, tasks };
          })
        )
      );
    });
    return forkJoin(observables);
  }

  searchTask(boards: IBoard[]) {
    this.isSeachingTasks = true;
    this.getTasks(boards).subscribe((data) => {
      this.tasksResults = data;
      let tasks: ITask[] = [];
      data.forEach((el) => (el ? (tasks = tasks.concat(el.tasks)) : null));
      this.isSeachingTasks = false;
      this.showTaskSearchResults(this.getFilteredTasks(tasks));
    });
  }
  getFilteredTasks(tasks: ITask[]) {
    return tasks.filter((task) => {
      return (
        task.title.includes(this.taskSearchInput) ||
        task.description.includes(this.taskSearchInput) ||
        (this.getAssigneeName(task.userId) &&
          this.getAssigneeName(task.userId).includes(this.taskSearchInput))
      );
    });
  }
  showTaskSearchResults(tasks: ITask[]) {
    this.isResultsShown = true;
    this.tasks = tasks;
  }
  getBoardName(taskId: string) {
    return this.tasksResults.filter((el) => {
      return el.tasks.map((el) => el.id).includes(taskId);
    })[0].boardName;
  }

  getBoardId(taskId: string) {
    return this.tasksResults.filter((el) => {
      return el.tasks.map((el) => el.id).includes(taskId);
    })[0].boardId;
  }

  closeResults(evt: Event) {
    evt.stopPropagation();
    this.isResultsShown = false;
    this.tasks = [];
    this.tasksResults = [];
    this.taskSearchInput = '';
  }
  getAssigneeName(userId: string) {
    if (this.users.length) {
      return (
        this.users.filter((el) => el.id === userId)[0]?.name ||
        'was deleted from base'
      );
    }
    return '';
  }
  search(value: string) {
    this.title = value;
  }
  clearInput() {
    this.title = '';
    this.searchStr = '';
  }
  deleteBoard(id: string | null) {
    if (id) {
      this.apiFacade.deleteBoardById(id);
    }
  }
}
