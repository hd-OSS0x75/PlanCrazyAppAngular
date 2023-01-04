import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../../services/session-storage.service";
import {AppUserService} from "../../../services/app-user.service";
import {CalendarService} from "../../../services/calendar/calendar.service";
import * as events from "events";

@Component({
  selector: 'app-app-user-homepage',
  templateUrl: './app-user-homepage.component.html',
  styleUrls: ['./app-user-homepage.component.css']
})
export class AppUserHomepageComponent implements OnInit {
  nickname: string = 'Profil';
  taskList: any[] = [];

  constructor(private sessionStorageService: SessionStorageService,
              private appUserService: AppUserService,
              private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.updateNickname(<string>this.sessionStorageService.getAppUserId());
    this.getAppUserTasks();
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

  private getAppUserTasks() {
    this.calendarService.getAll()
      .subscribe({
        next: value => {
          this.taskList = value;
        },
        error: err => {console.log(err);}
      });
  }

  deleteTask($event: string) {
    console.log($event);
  }
}
