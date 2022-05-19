import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  public isModalOn: boolean = false;

  @Input() title = ""

  public toggleModal(): void {
    this.isModalOn = !this.isModalOn
  }
}
