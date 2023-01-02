import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor() {
  }

  seConnecter() {
    if (this.signingInAppUserForm.valid) {
      const data = {
        email: this.signingInAppUserForm.value.email,
        password: this.signingInAppUserForm.value.password
      };

      console.log(data);
    }
  }

  private invalidField(field: string): boolean {
    // @ts-ignore //todo : vérifier le @ts-ignore, pourquoi il veut un type string ou null ???
    return this.signingInAppUserForm.controls[field].invalid && (this.signingInAppUserForm.controls[field].dirty || this.signingInAppUserForm.controls[field].touched);
  }

  emailIsInvalid(): boolean {
    return this.invalidField('email');
  }

  passwordIsInvalid(): boolean {
    return this.invalidField('password')
  }
}
