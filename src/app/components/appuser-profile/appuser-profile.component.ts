import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../services/session-storage.service";
import {AppUserService} from "../../services/app-user.service";

@Component({
  selector: 'app-appuser-profile',
  templateUrl: './appuser-profile.component.html',
  styleUrls: ['./appuser-profile.component.css']
})
export class AppuserProfileComponent implements OnInit {

  //todo : use proper TS model type of AppUser
  currentUserProfile = {
    nickname: '',
    firstName: '',
    lastName: '',
    address: '',
    postcode: '',
    city: '',
    phoneNumber: '',
    email: '',
    password: ''
  };

  constructor(private sessionStorageService: SessionStorageService,
              private appUserService: AppUserService) {
  }

  ngOnInit(): void {
    this.getAppUser(<string>this.sessionStorageService.getAppUserId());
  }


  private getAppUser(appUserId: string) {
    this.appUserService.get(appUserId)
      .subscribe({
        next: value => {
          this.currentUserProfile['nickname'] = value['nickname'];
          this.currentUserProfile['firstName'] = value['firstName'];
          this.currentUserProfile['lastName'] = value['lastName'];
          this.currentUserProfile['address'] = value['address'];
          this.currentUserProfile['postcode'] = value['postcode'];
          this.currentUserProfile['city'] = value['city'];
          this.currentUserProfile['phoneNumber'] = value['phoneNumber'];
          this.currentUserProfile['email'] = value['email'];
          this.currentUserProfile['password'] = value['password'];
          console.log(this.currentUserProfile);
        },
        error: err => {console.log(err);}
      })
  }
}
