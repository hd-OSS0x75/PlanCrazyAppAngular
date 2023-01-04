import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../../services/session-storage.service";
import {AppUserService} from "../../../services/app-user.service";
import {TaskService} from "../../../services/calendar/task.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
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
