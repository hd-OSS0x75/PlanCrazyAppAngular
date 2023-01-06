import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../../services/security/session-storage.service";
import {AppUserService} from "../../../services/app-user-authentification/app-user.service";
import {TaskService} from "../../../services/calendar/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../../models/task";

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.css']
})
export class DetailsTaskComponent implements OnInit{
  nickname: string = 'Profil';
  currentTask: any = {};//todo : replace any by task model
  updateTaskForm = new FormGroup({
    title: new FormControl([{value: '', disabled: true}, Validators.required]),
    location: new FormControl([{value: '', disabled: true}]),
    startingDate: new FormControl([{value: '', disabled: true}, Validators.required]),
    endingDate: new FormControl([{value: '', disabled: true}]),
    startingHour: new FormControl ([{value: '', disabled: true}]),
    endingHour: new FormControl([{value: '', disabled: true}]),
    description: new FormControl([{value: '', disabled: true}]),
  });


  constructor(private sessionStorageService: SessionStorageService,
              private appUserService: AppUserService,
              private route: ActivatedRoute,
              private taskService: TaskService,
              private router: Router) {}

  ngOnInit(): void {
    this.updateNickname();
    this.getTask(this.route.snapshot.params['id']);//todo : meilleure méthode que snapshot?
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
      next: value => {
        console.log(value);
        this.currentTask['title'] = value['taskTitle'];
        this.currentTask['location'] = value['location'];
        this.currentTask['startingDate'] = value['startingDate'];
        this.currentTask['endingDate'] = value['endingDate'];
        this.currentTask['startingHour'] = value['startingHour'];
        this.currentTask['endingHour'] = value['endingHour'];
        this.currentTask['description'] = value['description'];
        console.log(this.currentTask);
      },
      error: err => {console.log(err);}
    });
  }
}
