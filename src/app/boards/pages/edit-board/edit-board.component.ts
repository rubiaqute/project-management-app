import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiServices} from "../../../core/services/api-services";
import {IBoardRequest} from "../../../core/models/api.models";

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss']
})
export class EditBoardComponent implements OnInit {
  public id: string | undefined;
  public subscription: Subscription[] = [];
  public titleValue: string = '';
  public editBoardForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private apiService: ApiServices) {
  }

  ngOnInit(): void {
    this.subscription.push(
      this.activateRoute.params.subscribe(
        (params: { [x: string]: string | undefined }) =>
          (this.id = params['id'])
      )
    );
    this.editBoardForm = this.fb.group({
      title: ['', [Validators.required]],
    });

  }

  get title(): AbstractControl | null {
    return this.editBoardForm.get('title');
  }

  getBoard() {
    const board = JSON.parse(localStorage.getItem('boards')!);
    if (board) {
      this.apiService.getBoardById(board.id).subscribe(() => {
        console.log('Board ПОЛУЧЕН');
      })
    }
  }

  editBoard() {
    const body: IBoardRequest = {
      title: this.title?.value,
    }
    const board = JSON.parse(localStorage.getItem('boards')!);
    if (board) {
      this.apiService.updateBoard(body, board.id).subscribe(() => {
        console.log('Board updated');
      })
    }
    setTimeout(() => this.router.navigateByUrl('/main'), 0);
  }
}
