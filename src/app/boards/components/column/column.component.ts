import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {ConfirmationModalComponent} from 'src/app/core/components/confirmation-modal/confirmation-modal.component';
import {IColumn, IColumnRequest, ITask, ITaskRequest, ITaskRequestUpdate, IUser} from 'src/app/core/models/api.models';
import {ApiFacade} from 'src/app/store/facade';
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit, OnDestroy {
  public columnId!: string;

  @Input()
  public boardId!: string;

  @Input()
  public column!: IColumn;

  @Output()
  public currentTaskChange = new EventEmitter<ITask>();

  @Input()
  public currentTask: ITask | undefined;

  @Output()
  public prevColumnChange = new EventEmitter<IColumn>();

  @Input()
  public prevColumn: IColumn | undefined;

  public users$: Observable<IUser[]> = this.apiFacade.users$
  public users: IUser[] = []
  public isTitleEditMode: boolean = false;
  public title: string | undefined;
  public description: string | undefined;
  public isAddTaskModalOn: boolean = false;
  public isTaskDetailsModalOn: boolean = false;
  public isEditTaskModalOn: boolean = false;
  public isErrorModalOn: boolean = false;
  public subs: Subscription[] = [];
  public userExecutor: IUser | undefined;
  public MAX_TASK_ORDER: number = 0;
  public INDEX_COEFFICIENT: number = 100000000;
  public isLoaderOn: boolean = false;
  public addTaskForm!: FormGroup;
  public editTaskForm!: FormGroup;
  public modalEditTitle = "BOARD.EDIT_TASK";
  public modalAddTitle = "BOARD.ADD_TASK";

  @ViewChildren(ModalComponent) children: QueryList<any> | undefined;

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private apiFacade: ApiFacade,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.MAX_TASK_ORDER = this.column!.tasks?.slice(-1)[0]
      ? this.column!.tasks?.slice(-1)[0].order
      : 0;
    this.users$.subscribe((data) => this.users = data)
  }

  ngOnChanges(): void {
    this.editTaskForm = this.fb.group({
      title: [`${this.currentTask?.title}`, [Validators.required]],
      description: [`${this.currentTask?.description}`, [Validators.required]],
      user: ['', [Validators.required]]
    });
    this.addTaskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      user: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }

  public switchTitleEdit(): void {
    this.title = this.column!.title;
    this.isTitleEditMode = !this.isTitleEditMode;
  }

  public deleteColumn(): void {
    this.apiFacade.deleteColumn(this.boardId, this.column.id)
  }

  public setColumnTitle(newTitle: string): void {
    if (!newTitle || !newTitle.trim()) newTitle = '**';
    const columnRequest: IColumnRequest = {
      title: newTitle,
      order: this.column!.order
    }
    this.apiFacade.updateColumn(this.boardId, this.column.id, columnRequest)
    this.switchTitleEdit();
  }

  public switchTaskModal(mode: string = 'edit'): void {
    if (mode === 'add') {
      this.isAddTaskModalOn = !this.isAddTaskModalOn
      this.title = '';
      this.description = '';
      this.userExecutor = undefined;
      this.isTaskDetailsModalOn = false;
    } else {
      this.isEditTaskModalOn = !this.isEditTaskModalOn;
      this.title = this.currentTask?.title;
      this.description = this.currentTask?.description;
      this.isTaskDetailsModalOn = false;
    }
  }

  public switchErrorModal(): void {
    this.isErrorModalOn = !this.isErrorModalOn;
  }

  public switchTaskDetailsModal(): void {
    this.isTaskDetailsModalOn = !this.isTaskDetailsModalOn;
  }

  get titleTask(): AbstractControl | null {
    return this.addTaskForm.get('title');
  }

  get descriptionTask(): AbstractControl | null {
    return this.addTaskForm.get('description');
  }

  get userTask(): AbstractControl | null {
    return this.addTaskForm.get('user');
  }

  public createTask(): void {
    this.MAX_TASK_ORDER = this.MAX_TASK_ORDER + this.INDEX_COEFFICIENT;

    const taskRequest: ITaskRequest = {
      title: this.titleTask?.value,
      done: false,
      order: this.MAX_TASK_ORDER,
      description: this.descriptionTask?.value,
      userId: this.userTask?.value.id,
    };
    this.apiFacade.createTask(this.boardId, this.column.id, taskRequest)
  }

  get titleTaskEdit(): AbstractControl | null {
    return this.editTaskForm.get('title');
  }

  get descriptionTaskEdit(): AbstractControl | null {
    return this.editTaskForm.get('description');
  }

  get userTaskEdit(): AbstractControl | null {
    return this.editTaskForm.get('user');
  }

  public editTask(): void {
    const taskRequest: ITaskRequestUpdate = {
      title: this.titleTaskEdit?.value,
      done: this.currentTask!.done,
      order: this.currentTask!.order,
      description: this.descriptionTaskEdit?.value!,
      userId: this.userTaskEdit?.value.id,
      boardId: this.boardId,
      columnId: this.column!.id,
    };
    this.apiFacade.updateTask(this.boardId, this.column.id, this.currentTask!.id, taskRequest)
  }

  public drop(event: CdkDragDrop<ITask[]>): void {

    const nextItem: number = this.column!.tasks![event.currentIndex + 1]
      ? this.column!.tasks![event.currentIndex + 1].order
      : this.MAX_TASK_ORDER + this.INDEX_COEFFICIENT * 2;
    const prevItem: number = this.column!.tasks![event.currentIndex - 1]
      ? this.column!.tasks![event.currentIndex - 1].order
      : 0;
    let freeIdx: number = Math.round(((nextItem - prevItem) / 2) + prevItem);


    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      if (event.previousIndex !== event.currentIndex) {
        const taskRequest: ITaskRequestUpdate = {
          title: this.currentTask!.title,
          done: this.currentTask!.done,
          order: freeIdx,
          description: this.currentTask!.description,
          userId: this.currentTask!.userId,
          boardId: this.boardId,
          columnId: this.column!.id,
        }
        this.apiFacade.updateTask(this.boardId,
          this.column!.id,
          this.currentTask!.id,
          taskRequest)
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const orderArray: ITask[] = Object.assign([], this.column.tasks)
      const taskRequest: ITaskRequest = {
        title: this.currentTask!.title,
        done: this.currentTask!.done,
        order: Math.max(...orderArray.map((el) => el.order)) + this.INDEX_COEFFICIENT,
        description: this.currentTask!.description,
        userId: this.currentTask!.userId,
      }
      this.apiFacade.deleteTask(this.boardId, this.prevColumn!.id, this.currentTask!.id)
      this.apiFacade.createTask(this.boardId, this.column.id, taskRequest)
    }
  }

  public setCurrentTask(task: ITask,): void {
    this.currentTask = task;
    this.currentTaskChange.emit(task);
    this.userExecutor = this.users.find((el) => el.id === task.userId)
  }

  public setPrevColumn(column: IColumn): void {
    this.prevColumnChange.emit(column);
  }

  public switchLoader(): void {
    this.isLoaderOn = !this.isLoaderOn;
  }

  public openDialog(e: Event): void {
    e.stopPropagation()
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {name: 'CONFIRMATION.COLUMN', isConfirmed: false},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteColumn()
    });
  }

  public stopPropagation(evt: Event): void {
    evt.stopPropagation();
  }

  public openAddTaskModal(boardId: string, columnId: string): void {
    this.boardId = boardId;
    this.columnId = columnId;
    this.children?.first?.toggleModal();
  }

  public openEditTaskModal(boardId: string, columnId: string): void {
    this.boardId = boardId;
    this.columnId = columnId;
    this.children?.last?.toggleModal();
  }
}
