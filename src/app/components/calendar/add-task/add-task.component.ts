import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../../services/security/session-storage.service";
import {AppUserService} from "../../../services/app-user-authentification/app-user.service";
import {TaskService} from "../../../services/calendar/task.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../../models/task";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  nickname: string = 'Profil';
  newTaskForm!: FormGroup;

  constructor(private sessionStorageService: SessionStorageService,
              private appUserService: AppUserService,
              private taskService: TaskService,
              private formBuilder: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.updateNickname();
    this.newTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      location: [''],
      startingDate: ['', Validators.required],
      endingDate: [''],
      startingHour: [''],
      endingHour: [''],
      URL: [''],
      description: [''],
    });
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

  onSubmit() {
    const newTask : Task = {
      taskTitle: this.newTaskForm.value.title,
      description: this.newTaskForm.value.description,
      location: this.newTaskForm.value.location,
      startingDate: this.newTaskForm.value.startingDate,
      startingHour: this.newTaskForm.value.startingHour,
      endingDate: this.newTaskForm.value.endingDate,
      endingHour: this.newTaskForm.value.endingHour,
      private: true
    };
    console.log(newTask);
    this.taskService.add(newTask).subscribe({
      next:()=>this.router.navigate(['/month']),
      error: (err)=>console.log(err)
    });

  }

  validationProblem() {

  }
}
