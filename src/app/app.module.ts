import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AppuserSignupComponent } from './components/appuser-signup/appuser-signup.component';
import { AppuserSigninComponent } from './components/appuser-signin/appuser-signin.component';
import { AppuserProfileComponent } from './components/appuser-profile/appuser-profile.component';
import { AppRoutingModule } from './app-routing.module';
import { FormSignupComponent } from './components/form-signup/form-signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AppuserSignupComponent,
    AppuserSigninComponent,
    AppuserProfileComponent,
    FormSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
