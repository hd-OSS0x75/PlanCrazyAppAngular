import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-user-task-is-shared-with',
  templateUrl: './user-task-is-shared-with.component.html',
  styleUrls: ['./user-task-is-shared-with.component.css']
})
export class UserTaskIsSharedWithComponent {
  @Input('email')
  appUserEmail?: string;

  @Output()
  unshareWithThisUserEvent = new EventEmitter<string>();

  unShareWithThisUser() {
    this.unshareWithThisUserEvent.emit(this.appUserEmail);
  }
}
