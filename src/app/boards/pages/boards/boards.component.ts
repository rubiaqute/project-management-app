import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IBoard, Status } from 'src/app/core/models/api.models';
import { ApiServices } from 'src/app/core/services/api-services.service';
import { Router } from "@angular/router";
import { debounceTime, map, Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
// import { selectBoards } from "../../../store/selectors";
import { ApiFacade } from 'src/app/store/facade';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],

})
export class BoardsComponent implements OnInit {

  searchStr: string = '';
  subs: Subscription | undefined;
  title: string = '';
  isLoading: Observable<boolean> = this.apiFacade.boardsLoadingStatus$

  public boards$: Observable<IBoard[]> = this.apiFacade.boards$.pipe(
    map((boards: IBoard[]) => [...boards].sort((a, b) => a.title.localeCompare(b.title)))
  )
  constructor(private apiFacade: ApiFacade, public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.apiFacade.loadBoards();

  }
  openDialog(id: string | null, e: Event): void {
    e.stopPropagation()
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { name: 'CONFIRMATION.BOARD', isConfirmed: false },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteBoard(id)
    });
  }

  search(value: string) {
    this.title = value;
  }
  deleteBoard(id: string | null) {

    if (id) {
      this.apiFacade.deleteBoardById(id)
    }
  }
}
