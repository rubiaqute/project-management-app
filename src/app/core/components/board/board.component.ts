import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  public isTitleEditMode: boolean = false;

  public openTitleEdit() {
    this.isTitleEditMode = true;
  }

  public closeTitleEdit() {
    this.isTitleEditMode = false;
  }

}
