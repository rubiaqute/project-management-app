import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public isModalOn: boolean = false;

  constructor() { }

  ngOnInit(): void {}

  @Input() title = ""

  public toggleModal(): void {
    this.isModalOn = !this.isModalOn
  }
}
