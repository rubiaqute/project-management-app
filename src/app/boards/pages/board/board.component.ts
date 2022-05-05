import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBoard, IColumnRequest } from 'src/app/core/models/api.models';
import { ApiServices } from 'src/app/core/services/api-services';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public id: string | undefined;

  public subscription: Subscription[] = [];

  public board: IBoard | undefined;

  constructor(private activateRoute: ActivatedRoute, private api: ApiServices, private router: Router) {}

  ngOnInit(): void {
    this.subscription.push(
      this.activateRoute.params.subscribe(
        (params: { [x: string]: string | undefined }) =>
          (this.id = params['id'])
      )
    );

    this.api.getBoardById(this.id!).subscribe((data) => this.board = data);
  }

  public createColumn(title: string) {
    const columnRequest: IColumnRequest = {
      title: title,
      order: this.board!.columns!.length + 1,
    }

    this.api.createColumn(columnRequest, this.board!.id)
      .subscribe((data) => this.board?.columns?.push(data));
  }
}
