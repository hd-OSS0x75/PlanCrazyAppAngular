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
import { AppUserHomepageComponent } from './components/calendar/app-user-homepage/app-user-homepage.component';
import { AddTaskComponent } from './components/calendar/add-task/add-task.component';
import { DetailsTaskComponent } from './components/calendar/details-task/details-task.component';
import { UpdateTaskComponent } from './components/calendar/update-task/update-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AppuserSignupComponent,
    AppuserSigninComponent,
    AppuserProfileComponent,
    FormSignupComponent,
    AppUserHomepageComponent,
    AddTaskComponent,
    DetailsTaskComponent,
    UpdateTaskComponent
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
