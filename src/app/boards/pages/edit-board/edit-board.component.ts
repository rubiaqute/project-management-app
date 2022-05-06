import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiServices} from "../../../core/services/api-services";
import {IBoard, IBoardRequest} from "../../../core/models/api.models";

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
    if (this.id) {
      this.apiService.getBoardById(this.id).subscribe((data: IBoard) => {
        this.titleValue = data.title;
      })
    }
  }

  get title(): AbstractControl | null {
    return this.editBoardForm.get('title');
  }

  getBoard() {

  }


  editBoard() {
    const body: IBoardRequest = {
      title: this.title?.value,
    }
    if (this.id) {
      this.apiService.updateBoard(body, this.id).subscribe(() => {
        console.log('Board updated');
      })
    }
    setTimeout(() => this.router.navigateByUrl('/main'), 0);
  }
}
