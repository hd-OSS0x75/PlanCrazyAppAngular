import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/authentification/homepage/homepage.component';
import { AppuserSignupComponent } from './components/authentification/appuser-signup/appuser-signup.component';
import { AppuserSigninComponent } from './components/authentification/appuser-signin/appuser-signin.component';
import { AppuserProfileComponent } from './components/appuser-profile/appuser-profile.component';
import { AppRoutingModule } from './app-routing.module';
import { FormSignupComponent } from './components/authentification/form-signup/form-signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AppUserHomepageComponent } from './components/calendar/app-user-homepage/app-user-homepage.component';
import { AddTaskComponent } from './components/calendar/add-task/add-task.component';
import { DetailsTaskComponent } from './components/calendar/details-task/details-task.component';
import { UpdateTaskComponent } from './components/calendar/update-task/update-task.component';
import { TaskComponent } from './components/calendar/task/task.component';
import {AuthInterceptorProviders} from "./helpers/auth.interceptor";
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from "@angular/common";
import {FlashMessagesModule} from "flash-messages-angular";
registerLocaleData(localeFr, 'fr-FR')


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
    UpdateTaskComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot()

  ],
  providers: [
    AuthInterceptorProviders,
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
