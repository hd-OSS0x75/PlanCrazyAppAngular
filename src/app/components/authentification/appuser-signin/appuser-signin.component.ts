import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SessionStorageService} from "../../../services/security/session-storage.service";
import {AuthService} from "../../../services/security/auth.service";
import {AppUserService} from "../../../services/app-user-authentification/app-user.service";
import {Router} from "@angular/router";

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
              private authService: AuthService,
              private router: Router) {
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
                this.authService.login(dataForm.email, dataForm.password, <string>value['appUserId']);
                this.router.navigate(['/month']);
              } else {
                console.log('Incorrect password'); // todo reactive, maybe do not print here as every value is tested
              }
            } else {
              // console.log("This email adress doesn't exists"); // todo reactive, => do not print here as every value is tested
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

  test() {
    this.appUserService.get(this.sessionStorageService.getAppUserId())
      .subscribe({
        next: data => {
          console.log(data);
        },
        error: err => {console.log(err);}
      })
  }
}
