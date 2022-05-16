import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from "rxjs";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServices } from "../../../core/services/api-services.service";
import { IBoardRequest } from "../../../core/models/api.models";
import { ApiFacade } from 'src/app/store/facade';
import { ofType } from '@ngrx/effects';
import { BoardsTypes } from 'src/app/store/actions/boards.actions';
import { ActionsSubject } from '@ngrx/store';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit {
  public id: string | undefined;
  public subscription: Subscription[] = [];
  public titleValue: string = '';
  public descriptionValue: string = '';
  public newBoardForm!: FormGroup;
  subsc = new Subscription();
  isLoading: Observable<boolean> = this.apiFacade.boardsLoadingStatus$


  constructor(private fb: FormBuilder,
    private router: Router,
    private apiFacade: ApiFacade,
    private actionsSubj: ActionsSubject) {
  }

  ngOnInit(): void {
    this.newBoardForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.subsc = this.actionsSubj.pipe(
      ofType(BoardsTypes.CreateBoardSuccess)
    ).subscribe(data => {
      this.router.navigateByUrl('/main')
    });
  }

  get title(): AbstractControl | null {
    return this.newBoardForm.get('title');
  }

  get description(): AbstractControl | null {
    return this.newBoardForm.get('description');
  }

  createBoard() {
    const body: IBoardRequest = {
      title: this.title?.value,
      description: this.description?.value,
    }
    this.apiFacade.createBoard(body)
  }
}
