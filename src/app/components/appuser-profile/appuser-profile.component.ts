import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../services/security/session-storage.service";
import {AppUserService} from "../../services/app-user-authentification/app-user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppUser} from "../../models/app-user";
import {FlashMessagesService} from "flash-messages-angular";

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

  currentUserProfile: AppUser = {
    nickname: '',
    firstName: '',
    lastName: '',
    address: '',
    postcode: 0,
    city: '',
    phoneNumber: 0,
    email: '',
    password: ''
  };

  allowModification: boolean = false;

  constructor(private sessionStorageService: SessionStorageService,
              private appUserService: AppUserService,
              private flashMessage: FlashMessagesService) {
  }

  //BLOC : fonctions à l'initialisation
  ngOnInit(): void {
    this.getAppUser();
  }


  private getAppUser() {
    this.appUserService.get()
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
      });
  }


  // BLOC : fonctions de validation des champs
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

  // BLOC : gestion de l'évènement : l'utilisateur clique sur le bouton modifier

  changeModificationAbility() {
    this.allowModification = !this.allowModification;
    this.updateFields();
    this.changeFieldsDisplay();
  }

  private updateFields() {
    this.getAppUser();
  }

  private changeFieldsDisplay() {
    if (this.allowModification) {
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


  // BLOC : l'utilisateur clique sur le bouton valider les modifications
  allowSendingModification(): boolean {
    return this.allowModification && this.profileAppUserForm.dirty && !this.profileAppUserForm.invalid;
  }

  seModifier() {
    const modifiedAppUser: AppUser = {
      nickname: this.currentUserProfile['nickname'],
      firstName: this.currentUserProfile['firstName'],
      lastName: this.currentUserProfile['lastName'],
      address: this.currentUserProfile['address'],
      postcode: this.currentUserProfile['postcode'],
      city: this.currentUserProfile['city'],
      phoneNumber: this.currentUserProfile['phoneNumber'],
      email: this.currentUserProfile['email'],
      password: this.currentUserProfile['password']
    };

    console.log(modifiedAppUser);//todo : test this functionnality
    this.appUserService.updateAppUser(modifiedAppUser).subscribe({
      next: value => {console.log(value);},
      error: err => {console.log(err);}
    });
  }

//MESSAGE FLASH
  //1er paramètre: message
  //2nd paramètre: optionnel (durée message, genre d'alerte etc.)
  showFlash(){
    this.flashMessage.show('Modifications prises en compte');
  }
}
