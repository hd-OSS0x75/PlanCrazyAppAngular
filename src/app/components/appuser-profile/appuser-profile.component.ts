import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../services/session-storage.service";
import {AppUserService} from "../../services/app-user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-appuser-profile',
  templateUrl: './appuser-profile.component.html',
  styleUrls: ['./appuser-profile.component.css']
})
export class AppuserProfileComponent implements OnInit {
  profileAppUserForm = new FormGroup({
    nickname: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

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
        },
        error: err => {
          console.log(err);
        }
      })
  }

  private invalidField(field: string): boolean {
    //todo : vérifier le @ts-ignore, pourquoi il veut un type string ou null ???
    // @ts-ignore
    return this.profileAppUserForm.controls[field].invalid && (this.profileAppUserForm.controls[field].dirty || this.profileAppUserForm.controls[field].touched);
  }


  nicknameIsInvalid(): boolean {
    return this.invalidField('nickname');
  }

  firstNameIsInvalid(): boolean {
    return this.invalidField('firstName');
  }

  lastNameIsInvalid(): boolean {
    return this.invalidField('lastName');
  }

  addressIsInvalid(): boolean {
    return this.invalidField('address');
  }

  postcodeIsInvalid(): boolean {
    return this.invalidField('postcode');
  }

  cityIsInvalid(): boolean {
    return this.invalidField('city');
  }

  phoneNumberIsInvalid(): boolean {
    return this.invalidField('phoneNumber');
  }

  emailIsInvalid(): boolean {
    return this.invalidField('email');
  }

  passwordIsInvalid(): boolean {
    return this.invalidField('password');
  }

  seModifier() {

  }
}
