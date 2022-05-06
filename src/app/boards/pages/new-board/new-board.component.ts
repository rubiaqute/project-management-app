import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiServices} from "../../../core/services/api-services";
import {IBoardRequest} from "../../../core/models/api.models";

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit {
  public id: string | undefined;
  public subscription: Subscription[] = [];
  public titleValue: string = '';
  public newBoardForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private apiService: ApiServices) {
  }

  ngOnInit(): void {
    this.newBoardForm = this.fb.group({
      title: ['', [Validators.required]],
    });
  }

  get title(): AbstractControl | null {
    return this.newBoardForm.get('title');
  }

  createBoard() {
    const body: IBoardRequest = {
      title: this.title?.value,
    }
    this.apiService.createBoard(body).subscribe(() => {
      console.log('Board created');
    })
    setTimeout(() => this.router.navigateByUrl('/main'), 0);
  }
}
