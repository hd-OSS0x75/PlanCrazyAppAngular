import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from "../../services/security/session-storage.service";
import {AppUserService} from "../../services/app-user-authentification/app-user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppUser} from "../../models/app-user";
import {FlashMessagesService} from "flash-messages-angular";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-appuser-profile',
  templateUrl: './appuser-profile.component.html',
  styleUrls: ['./appuser-profile.component.css']
})
export class AppuserProfileComponent implements OnInit {
  profileAppUserForm = new FormGroup({
    nickname: new FormControl({value: '', disabled: true},[Validators.required]),
    firstName: new FormControl({value: '', disabled: true},),
    lastName: new FormControl({value: '', disabled: true},),
    address: new FormControl({value: '', disabled: true},),
    postcode: new FormControl({value: '', disabled: true},[Validators.pattern("^[0-9]{5}$")]),
    city: new FormControl({value: '', disabled: true},),
    phoneNumber: new FormControl({value: '', disabled: true},
      [Validators.required,  Validators.pattern("^[0-9]{10}$")]),
    email: new FormControl({value: '', disabled: true},
      [Validators.required, Validators.email]),
    password: new FormControl({value: '', disabled: false},
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
  toDisplayModifier: boolean = true;
  toDisplayValider: boolean = false;

  constructor(private sessionStorageService: SessionStorageService,
              private appUserService: AppUserService,
              private flashMessage: FlashMessagesService,
              private toastr: ToastrService) {
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
    this.toDisplayModifier = !this.toDisplayModifier;
    this.toDisplayValider = !this.toDisplayValider;
    this.updateFields();
    this.changeFieldsDisplay();
  }

  private updateFields() {
    this.getAppUser();
  }

  private changeFieldsDisplay() {
    if (this.allowModification) {
      this.profileAppUserForm.get('nickname')?.disable();
      this.profileAppUserForm.get('firstName')?.enable();
      this.profileAppUserForm.get('lastName')?.enable();
      this.profileAppUserForm.get('address')?.enable();
      this.profileAppUserForm.get('postcode')?.enable();
      this.profileAppUserForm.get('city')?.enable();
      this.profileAppUserForm.get('phoneNumber')?.disable();
      this.profileAppUserForm.get('email')?.disable();
      this.profileAppUserForm.get('password')?.disable();
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
    console.log(modifiedAppUser);
    this.appUserService.updateAppUser(modifiedAppUser).subscribe({
      next: value => {
        localStorage.setItem('selectedCity', modifiedAppUser.city);
        console.log(value);
        console.log(modifiedAppUser.city);
        },
      error: err => {console.log(err);}
    });
  }

//MESSAGE FLASH
  //1er paramètre: message
  //2nd paramètre: optionnel (durée message, genre d'alerte etc.)

  showFlash(){
    this.toDisplayModifier = !this.toDisplayModifier;
    this.toDisplayValider = !this.toDisplayValider;
    this.toastr.success("Modifications prises en compte");
    //this.flashMessage.show('Modifications prises en compte');
  }
}
