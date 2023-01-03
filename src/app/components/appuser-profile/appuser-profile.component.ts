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
    nickname: new FormControl({value: '', disabled: true},
      [Validators.required]),
    firstName: new FormControl({value: '', disabled: true},
      [Validators.required]),
    lastName: new FormControl({value: '', disabled: true},
      [Validators.required]),
    address: new FormControl({value: '', disabled: true},
      [Validators.required]),
    postcode: new FormControl({value: '', disabled: true},
      [Validators.required]),
    city: new FormControl({value: '', disabled: true},
      [Validators.required]),
    phoneNumber: new FormControl({value: '', disabled: true},
      [Validators.required]),
    email: new FormControl({value: '', disabled: true},
      [Validators.required, Validators.email]),
    password: new FormControl({value: '', disabled: true},
      [Validators.required])
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

  allowModification: boolean = false;

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
    return this.profileAppUserForm.controls[field].invalid && !this.profileAppUserForm.controls[field].pristine && this.allowModification;
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
    console.log(this.profileAppUserForm.value);//todo :
  }

  changeModificationAbility() {
    this.allowModification = !this.allowModification;
    this.updateFields();//todo : angular error, use the correct angular binding
    this.changeFieldsDisplay();
  }

  //todo : make it change the input values (maybe NgChange model ??). this doesn't do nothing
  private updateFields() {
    this.getAppUser(<string>this.sessionStorageService.getAppUserId());
  }

  private changeFieldsDisplay() {
    if (this.allowModification == true) {
      this.profileAppUserForm.get('nickname')?.enable();
      this.profileAppUserForm.get('firstName')?.enable();
      this.profileAppUserForm.get('lastName')?.enable();
      this.profileAppUserForm.get('address')?.enable();
      this.profileAppUserForm.get('postcode')?.enable();
      this.profileAppUserForm.get('city')?.enable();
      this.profileAppUserForm.get('phoneNumber')?.enable();
      this.profileAppUserForm.get('email')?.enable();
      this.profileAppUserForm.get('password')?.enable();
    } else {
      this.profileAppUserForm.get('nickname')?.disable();
      this.profileAppUserForm.get('firstName')?.disable();
      this.profileAppUserForm.get('lastName')?.disable();
      this.profileAppUserForm.get('address')?.disable();
      this.profileAppUserForm.get('postcode')?.disable();
      this.profileAppUserForm.get('city')?.disable();
      this.profileAppUserForm.get('phoneNumber')?.disable();
      this.profileAppUserForm.get('email')?.disable();
      this.profileAppUserForm.get('password')?.disable();
    }
  }

  allowSendingModification(): boolean {
    return this.allowModification && this.profileAppUserForm.dirty && !this.profileAppUserForm.invalid;
  }

}
