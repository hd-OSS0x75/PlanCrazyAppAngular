import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AppuserSignupComponent } from './components/appuser-signup/appuser-signup.component';
import { AppuserSigninComponent } from './components/appuser-signin/appuser-signin.component';
import { AppuserProfileComponent } from './components/appuser-profile/appuser-profile.component';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AppuserSignupComponent,
    AppuserSigninComponent,
    AppuserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
