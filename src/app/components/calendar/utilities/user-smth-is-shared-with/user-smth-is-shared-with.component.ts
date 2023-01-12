import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-user-smth-is-shared-with',
  templateUrl: './user-smth-is-shared-with.component.html',
  styleUrls: ['./user-smth-is-shared-with.component.css']
})
export class UserSmthIsSharedWithComponent {
  @Input('email')
  appUserEmail?: string;

  @Output()
  unshareWithThisUserEvent = new EventEmitter<string>();

  @Output()
  shareWithThisUserEvent = new EventEmitter<string>();

  unShareWithThisUser() {
    this.unshareWithThisUserEvent.emit(this.appUserEmail);
  }

  shareWithThisUser() {
    this.shareWithThisUserEvent.emit(this.appUserEmail);
  }
}
