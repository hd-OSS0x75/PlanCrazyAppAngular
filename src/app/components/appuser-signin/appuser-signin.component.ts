import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SessionStorageService} from "../../services/session-storage.service";
import {AuthService} from "../../services/auth.service";
import {AppUserService} from "../../services/app-user.service";

@Component({
  selector: 'app-appuser-signin',
  templateUrl: './appuser-signin.component.html',
  styleUrls: ['./appuser-signin.component.css']
})
export class AppuserSigninComponent {
  signingInAppUserForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  unexistingEmail: boolean = true;
  incorrectPassword: boolean = true;

  constructor(private sessionStorageService: SessionStorageService,
              private appUserService: AppUserService,
              private authService: AuthService) {
  }

  seConnecter() {
    if (this.signingInAppUserForm.valid) {
      const dataForm = {
        email: <string>this.signingInAppUserForm.value.email,
        password: <string>this.signingInAppUserForm.value.password
      };

      this.appUserService.getAll().subscribe({
        next: (data) => {
          data.forEach((value) => {
            if (value['email'] == dataForm.email) {
              this.unexistingEmail = false;
              if (value['password'] == dataForm.password){
                this.incorrectPassword = false;
                this.authService.login(dataForm.email, dataForm.password);
              } else {
                console.log('Incorrect password'); // todo reactive, not here
              }
            } else {
              console.log("This email adress doesn't exists"); // todo reactive, not here
            }
          })
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  private invalidField(field: string): boolean {
    //todo : vérifier le @ts-ignore, pourquoi il veut un type string ou null ???
    // @ts-ignore
    return this.signingInAppUserForm.controls[field].invalid && (this.signingInAppUserForm.controls[field].dirty || this.signingInAppUserForm.controls[field].touched);
  }

  emailIsInvalid(): boolean {
    return this.invalidField('email');
  }

  passwordIsInvalid(): boolean {
    return this.invalidField('password');
  }
}
