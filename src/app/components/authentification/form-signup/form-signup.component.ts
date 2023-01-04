import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppUserService} from "../../../services/app-user-authentification/app-user.service";
import {AppUser} from "../../../models/app-user";

@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.css']
})
export class FormSignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, //pour créer une représentation objet / TS de notre formulaire
              private appUserService: AppUserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      postcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      city: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', Validators.email],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
      // passwordConfirm: ['', [Validators.required, Validators.arguments == "password"]]
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
    //TODO : faire une redirection vers l'accueil de l'utilisateur (calendrier)
    this.appUserService.addAppUser(newAppUser).subscribe({
      next:()=>this.router.navigate(['/homepage']),
      error: (err)=>console.log(err)
    });
  }


//todo: methode utilitaire à sortir du composant
  //Pour les champs obligatoires (pseudo, tel, email, password)
  private invalidMandatoryField(field: string): boolean {
    //pour vérifier que le champ est ok et aussi pour être sûr que l'utilisateur a modifié le champs ou que l'utilisateur a touché au champs
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

  passwordIsInvalid(): boolean {
    if(this.signupForm.value.password !== this.signupForm.value.passwordConfirm) {
      return this.validField('password');
    }
    else {
    return this.invalidMandatoryField('password')};
  }

//permet d'activer ou de désactiver le bouton de validation
  //S'il y a encore des erreurs dans le formulaire alors le bouton n'est pas clickable
  validationProblem() {
    return this.signupForm.invalid ;

  }
}

