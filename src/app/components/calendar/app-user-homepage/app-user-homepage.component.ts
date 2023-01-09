import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../../services/security/session-storage.service";
import {AppUserService} from "../../../services/app-user-authentification/app-user.service";
import {TaskService} from "../../../services/calendar/task.service";

@Component({
  selector: 'app-app-user-homepage',
  templateUrl: './app-user-homepage.component.html',
  styleUrls: ['./app-user-homepage.component.css']
})
export class AppUserHomepageComponent implements OnInit {
  nickname: string = 'Profil';
  taskList: any[] = [];//todo : replace any by task model
  chosenDate = new Date();


  constructor(private sessionStorageService: SessionStorageService,
              private appUserService: AppUserService,
              private taskService: TaskService)  {   }

  ngOnInit(): void {
    this.updateNickname();
    this.getAppUserTasks();
  }

  private updateNickname() {
    this.appUserService.get()
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
    this.taskService.getAll()
      .subscribe({
        next: value => {
          this.taskList = value;
        },
        error: err => {console.log(err);}
      });
  }

  deleteTask($event: string) {
    console.log($event);
    this.taskService.delete($event).subscribe({
      next: value => console.log(value),
      error: err => console.log(err)
    });
  }

  choseDate($event: string) {
    console.log($event);
    this.chosenDate = <Date><unknown>$event;
  }

}
