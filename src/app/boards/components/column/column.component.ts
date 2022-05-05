import { Component, Input } from '@angular/core';
import { IColumn } from 'src/app/core/models/api.models';
import { ApiServices } from 'src/app/core/services/api-services';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input()
  public boardId!: string;

  @Input()
  public column: IColumn | undefined;
  
  public isTitleEditMode: boolean = false;  

  constructor(private api: ApiServices) {}

  public switchTitleEdit(): void {
    this.isTitleEditMode = !this.isTitleEditMode;
  }

  public deleteColumn(): void {
    this.api.deleteColumn(this.boardId, this.column!.id)
    .subscribe((data) => this.column = undefined);
  }
}
