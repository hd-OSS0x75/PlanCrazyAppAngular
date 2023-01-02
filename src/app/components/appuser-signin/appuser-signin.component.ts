import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-appuser-signin',
  templateUrl: './appuser-signin.component.html',
  styleUrls: ['./appuser-signin.component.css']
})
export class AppuserSigninComponent {
  signingInAppUserForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor() {
  }

  seConnecter() {
    const data = {
      email: this.signingInAppUserForm.value.email,
      password: this.signingInAppUserForm.value.password
    };

    console.log(data);
  }
}
