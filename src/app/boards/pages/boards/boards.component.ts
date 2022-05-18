import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IBoard, IBoardRequest, ITask, IUser, Status} from 'src/app/core/models/api.models';
import {ApiServices} from 'src/app/core/services/api-services.service';
import {ActivatedRoute, Router} from "@angular/router";
import {ActionsSubject} from "@ngrx/store";
import {ApiFacade} from 'src/app/store/facade';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationModalComponent} from 'src/app/core/components/confirmation-modal/confirmation-modal.component';
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ofType} from "@ngrx/effects";
import {BoardsTypes} from "../../../store/actions/boards.actions";
import {forkJoin, map, Observable, Subscription} from 'rxjs';
import {__assign} from 'tslib';

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
  public tasksResults: ITaskSearch[] = [];
  public tasks: ITask[] = [];
  public board: IBoard | undefined = undefined;
  public isResultsShown = false;
  public isSeachingTasks = false;
  public taskSearchInput: string = '';
  public subs: Subscription | undefined;
  public id: string | undefined;
  public title: string = '';
  public titleValue: string = '';
  public descriptionValue: string = '';
  public editBoardForm!: FormGroup;
  public subsc = new Subscription();
  public modalTitle = "BOARD.EDIT_BOARD";
  public subscription: Subscription[] = [];
  public users$: Observable<IUser[]> = this.apiFacade.users$;
  public users: IUser[] = [];
  public searchStr: string = '';
  public userExecutor: IUser | undefined;
  public isLoading: Observable<boolean> = this.apiFacade.boardsLoadingStatus$
  @ViewChild(ModalComponent) child: ModalComponent | undefined;

  public boards$: Observable<IBoard[]> = this.apiFacade.boards$.pipe(
    map((boards: IBoard[]) =>
      [...boards].sort((a, b) => a.title.localeCompare(b.title))
    )
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiFacade: ApiFacade,
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog,
    private apiService: ApiServices,
    private actionsSubj: ActionsSubject) {
  }

  ngOnInit(): void {
    this.apiFacade.loadBoards();
    this.apiFacade.getUsers();
    this.users$.subscribe((data) => (this.users = data));

    this.editBoardForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    if (this.id) {
      this.apiService.getBoardById(this.id).subscribe((data: IBoard) => {
        this.titleValue = data.title;
        this.descriptionValue = data.description
      })
    }
    this.subsc = this.actionsSubj.pipe(
      ofType(BoardsTypes.UpdateBoardSuccess)
    ).subscribe(data => {
      this.router.navigateByUrl('/main')
    });
  }

  ngOnChanges(): void {
    // this.editBoardForm = this.fb.group({
    //   title: [`${this.titleBoard?.value}`, [Validators.required]],
    //   description: [`${this.descriptionBoard?.value}`, [Validators.required]]
    // });
  }

  public openDialog(id: string | null, e: Event): void {
    e.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {name: 'CONFIRMATION.BOARD', isConfirmed: false},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.deleteBoard(id);
    });
  }

  public getTasks(boards: IBoard[]): Observable<ITaskSearch[]> {
    let observables: Observable<any>[] = [];
    boards.forEach((el) => {
      observables.push(
        this.apiService.getBoardById(el.id!).pipe(
          map((data) => {
            let tasks: ITask[] = [];
            data.columns?.forEach((column) => {
              column.tasks ? (tasks = tasks.concat(...column.tasks)) : null;
            });
            return {boardId: el.id, boardName: el.title, tasks};
          })
        )
      );
    });
    return forkJoin(observables);
  }

  public searchTask(boards: IBoard[]) {
    this.isSeachingTasks = true;
    this.getTasks(boards).subscribe((data) => {
      this.tasksResults = data;
      let tasks: ITask[] = [];
      data.forEach((el) => (el ? (tasks = tasks.concat(el.tasks)) : null));
      this.isSeachingTasks = false;
      this.showTaskSearchResults(this.getFilteredTasks(tasks));
    });
  }

  public getFilteredTasks(tasks: ITask[]) {
    return tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(this.taskSearchInput.trim().toLowerCase()) ||
        task.description.toLowerCase().includes(this.taskSearchInput.trim().toLowerCase()) ||
        (this.getAssigneeName(task.userId) &&
          this.getAssigneeName(task.userId).toLowerCase().includes(this.taskSearchInput.trim().toLowerCase()))
      );
    });
  }

  public showTaskSearchResults(tasks: ITask[]) {
    this.isResultsShown = true;
    this.tasks = tasks;
  }

  public getBoardName(taskId: string) {
    return this.tasksResults.filter((el) => {
      return el.tasks.map((el) => el.id).includes(taskId);
    })[0].boardName;
  }

  public getBoardId(taskId: string) {
    return this.tasksResults.filter((el) => {
      return el.tasks.map((el) => el.id).includes(taskId);
    })[0].boardId;
  }

  public closeResults(evt: Event) {
    evt.stopPropagation();
    this.isResultsShown = false;
    this.tasks = [];
    this.tasksResults = [];
    this.taskSearchInput = '';
  }

  public getAssigneeName(userId: string) {
    if (this.users.length) {
      return (
        this.users.filter((el) => el.id === userId)[0]?.name ||
        'was deleted from base'
      );
    }
    return '';
  }

  public search(value: string) {
    this.title = value;
  }

  public clearInput() {
    this.title = '';
    this.searchStr = '';
  }

  public deleteBoard(id: string | null) {
    if (id) {
      this.apiFacade.deleteBoardById(id);
    }
  }

  public stopPropagation(evt: Event): void {
    evt.stopPropagation();
  }

  public openEditBoardModal(e: Event, id: string, board: IBoard): void {
    this.id = id;
    this.board = board;
    e.stopPropagation();
    this.child?.toggleModal();
  }

  get titleBoard(): AbstractControl | null {
    return this.editBoardForm.get('title');
  }

  get descriptionBoard(): AbstractControl | null {
    return this.editBoardForm.get('description');
  }

  public editBoard() {
    const body: IBoardRequest = {
      title: this.titleBoard?.value,
      description: this.descriptionBoard?.value,
    }
    if (this.id) {
      this.apiFacade.updateBoardById(body, this.id);
      this.child?.toggleModal();
    }
  }

  public ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
