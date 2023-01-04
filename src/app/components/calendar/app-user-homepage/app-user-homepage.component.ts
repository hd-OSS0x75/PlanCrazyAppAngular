import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../../services/session-storage.service";
import {AppUserService} from "../../../services/app-user.service";

@Component({
  selector: 'app-app-user-homepage',
  templateUrl: './app-user-homepage.component.html',
  styleUrls: ['./app-user-homepage.component.css']
})
export class AppUserHomepageComponent implements OnInit {
  nickname: string = 'Profil';

  constructor(private sessionStorageService: SessionStorageService,
              private appUserService: AppUserService) {}

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
