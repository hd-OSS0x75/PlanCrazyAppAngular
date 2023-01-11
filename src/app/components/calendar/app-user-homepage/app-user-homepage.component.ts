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
  taskList: any[] = [];//todo : replace any by task model
  chosenDate = new Date();

  constructor(private sessionStorageService: SessionStorageService,
              private appUserService: AppUserService,
              private taskService: TaskService)  {   }

  ngOnInit(): void {

    this.getAppUserTasks();
  }

  private getAppUserTasks() {
    this.taskService.getAll()
      .subscribe({
        next: value => {
          this.taskList = value.filter(value1 => {
            return (new Date(value1.startingDate) <= new Date(this.chosenDate)) && (new Date(value1.endingDate) >= new Date(this.chosenDate))
          });
          console.log(this.taskList);
        },
        error: err => {console.log(err);}
      });

  }

  deleteTask($event: string) {
    console.log($event);
    this.taskService.delete($event).subscribe({
      next: value => this.getAppUserTasks(),
      error: err => console.log(err)
    });
  }

  choseDate($event: string) {
    console.log($event);
    this.chosenDate = <Date><unknown>$event; // todo : new Date($event)
    this.getAppUserTasks();
  }

}
