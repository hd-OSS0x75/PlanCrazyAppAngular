import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../../services/security/session-storage.service";
import {AppUserService} from "../../../services/app-user-authentification/app-user.service";
import {TaskService} from "../../../services/calendar/task.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.css']
})
export class DetailsTaskComponent implements OnInit{
  nickname: string = 'Profil';
  currentTask: any ={};//todo : replace any by task model


  constructor(private sessionStorageService: SessionStorageService,
              private appUserService: AppUserService,
              private route: ActivatedRoute,
              private taskService: TaskService) {}

  ngOnInit(): void {
    this.updateNickname();
    this.getTask(this.route.snapshot.params['id']);//todo : meilleure méthode ?
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

  private getTask(id: string) {
    this.taskService.get(id).subscribe({
      next: value => {this.currentTask = value;},
      error: err => {console.log(err);}
    });
  }
}
