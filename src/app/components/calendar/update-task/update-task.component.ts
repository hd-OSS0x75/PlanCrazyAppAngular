import { Component } from '@angular/core';
import {SessionStorageService} from "../../../services/session-storage.service";
import {AppUserService} from "../../../services/app-user.service";
import {TaskService} from "../../../services/calendar/task.service";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent {
  nickname: string = 'Profil';

  constructor(private sessionStorageService: SessionStorageService,
              private appUserService: AppUserService,
              private taskService: TaskService) {}

  ngOnInit(): void {
    this.updateNickname(<string>this.sessionStorageService.getAppUserId());
  }

  private updateNickname(appUserId: string) {
    this.appUserService.get(appUserId)
      .subscribe({
        next: value => {
          this.nickname = value['nickname'];
        },
        error: err => {
          console.log(err);
        }
      });
  }

}
