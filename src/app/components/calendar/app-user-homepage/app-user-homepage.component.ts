import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../../services/security/session-storage.service";
import {AppUserService} from "../../../services/app-user-authentification/app-user.service";
import {TaskService} from "../../../services/calendar/task.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-app-user-homepage',
  templateUrl: './app-user-homepage.component.html',
  styleUrls: ['./app-user-homepage.component.css']
})
export class AppUserHomepageComponent implements OnInit {
  taskList: any[] = [];//todo : replace any by task model
  chosenDate = new Date();
  userSharedWithEmailList!: string[];
  sharingUserEmail: String = '';

  constructor(private sessionStorageService: SessionStorageService,
              private appUserService: AppUserService,
              private taskService: TaskService,
              private router: Router,
              private toastr: ToastrService)  {   }

  ngOnInit(): void {
    this.getAppUserTasks();
    this.getUserSharedWithEmailList();
  }

  private getAppUserTasks() {
    this.taskService.getAll()
      .subscribe({
        next: value => {
          this.taskList = value.filter(value1 => {
            return (new Date(value1.startingDate) <= new Date(this.chosenDate)) && (new Date(value1.endingDate) >= new Date(this.chosenDate));
          });
        },
        error: err => {console.log(err);}
      });

  }

  private getUserSharedWithEmailList() {
    this.taskService.getEmailsAllUserSharedWith()
      .subscribe({
        next: value => {
          this.userSharedWithEmailList = value;
        },
        error: err => {console.log(err);}
      });

  }

  deleteTask($event: string) {
    this.taskService.delete($event).subscribe({
      next: value => {
        this.getAppUserTasks();
        window.location.reload();
        this.router.navigate(['/month']);
      },
      error: err => console.log(err)
    });
  }

  choseDate($event: string) {
    this.chosenDate = <Date><unknown>$event; // todo : new Date($event)
    this.getAppUserTasks();
  }

  shareAllWithUser() {
    this.taskService.shareAllWithUser(this.sharingUserEmail)
      .subscribe({
        next: value => {
          this.sharingUserEmail = '';
          this.getUserSharedWithEmailList();
        },
        error: err => {
          console.log(err);
          this.toastr.error("email non existant");
        }
      });
  }

  shareAllWithThisUser($event: string) {
    this.taskService.shareAllWithUser($event)
      .subscribe({
        next: value => {
          this.getUserSharedWithEmailList();
        },
        error: err => {
          console.log(err);
          this.toastr.error("calendrier déjà partagé.");
        }
      });
  }

  unshareAllWithThisUser($event: string) {
    this.taskService.unshareAllWithUser($event)
      .subscribe({
        next: value => {
          this.getUserSharedWithEmailList();
        },
        error: err => {
          console.log(err);
          this.toastr.error("erreur interne du serveur");
        }
      });
  }
}
