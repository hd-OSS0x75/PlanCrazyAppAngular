import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppUser} from "../../../models/app-user";
import {AppUserService} from "../../../services/app-user-authentification/app-user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/security/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.css']
})
export class FormSignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, //pour créer une représentation objet / TS de notre formulaire
              private appUserService: AppUserService,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      address: [''],
      postcode: ['', Validators.pattern("^[0-9]{5}$")],
      city: [''],
      phoneNumber: ['', [Validators.required,
        Validators.pattern("^[0-9]{10}$")
      ]],
      email: ['', [Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      passwordConfirm: ['', Validators.required]
    });
  }

  onSubmit() {
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

    //TODO : faire un login puis une redirection vers l'accueil de l'utilisateur (calendrier). À faire sans subscribe nestés !!
    this.authService.addAppUser(newAppUser).subscribe({
      next:() => {
        this.toastr.success("Inscription validée");
        this.router.navigate(['/signin'])},
      error: (err) => {
        console.log(err);
        this.toastr.error("Pseudo, téléphone ou email déjà utilisé");
      },
    });

  }

//PARTIE VALIDATION DES CHAMPS DU FORMULAIRE
//todo: methode utilitaire à sortir du composant
  //Pour les champs obligatoires (pseudo, tel, email, password)
  private invalidMandatoryField(field: string): boolean {
    return this.signupForm.controls[field].invalid && (this.signupForm.controls[field].dirty || this.signupForm.controls[field].touched);
  }

  //todo: gérer le pseudo déjà existant

  //POur les champs non obligatoire
  private invalidOptionnalField(field: string): boolean {
    return this.signupForm.controls[field].invalid && (this.signupForm.controls[field].value);
  }

  private validField(field: string): boolean {
    return this.signupForm.controls[field].valid && (this.signupForm.controls[field].dirty);
  }

  //METHODES PERMETTANT D'AFFICHER UN MESSAGE DANS LE FORMULAIRE EN FONCTION DES VALIDATORS DEFINIS
  nicknameIsInvalid(): boolean {
    return this.invalidMandatoryField('nickname');
  }

  postcodeIsInvalid(): boolean {
    return this.invalidOptionnalField('postcode');
  }

  phoneNumberIsInvalid(): boolean {
    return this.invalidMandatoryField('phoneNumber');
  }

  emailIsInvalid(): boolean {
    return this.invalidMandatoryField('email');
  }

  passwordlenghtIsInvalid(): boolean{
    return this.invalidMandatoryField('password');
  }

  passwordIsInvalid(): boolean {
    if(this.signupForm.value.password !== this.signupForm.value.passwordConfirm) {
      return this.validField('passwordConfirm');
    }
    else {
    return this.invalidMandatoryField('passwordConfirm')}
  }



}

