import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppUser} from "../../models/app-user";
import {AppUserService} from "../../services/app-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.css']
})
export class FormSignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private appUserService: AppUserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  onSubmit(){
    const newAppUser: AppUser = {
      nickname: this.signupForm.value.nickname,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      address: this.signupForm.value.address,
      postcode: this.signupForm.value.postcode,
      city: this.signupForm.value.city,
      phoneNumber: this.signupForm.value.phoneNumber,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    };
    //TODO : faire un login puis une redirection vers l'accueil de l'utilisateur (calendrier)
    this.appUserService.addAppUser(newAppUser).subscribe({
      next:()=>this.router.navigate(['/signin']),
      error: (err)=>console.log(err)
    });

  }
}
