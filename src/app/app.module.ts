import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/authentification/homepage/homepage.component';
import { AppuserSignupComponent } from './components/authentification/appuser-signup/appuser-signup.component';
import { AppuserSigninComponent } from './components/authentification/appuser-signin/appuser-signin.component';
import { AppuserProfileComponent } from './components/appuser-profile/appuser-profile.component';
import { AppRoutingModule } from './app-routing.module';
import { FormSignupComponent } from './components/authentification/form-signup/form-signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AppUserHomepageComponent } from './components/calendar/app-user-homepage/app-user-homepage.component';
import { AddTaskComponent } from './components/calendar/add-task/add-task.component';
import { DetailsTaskComponent } from './components/calendar/details-task/details-task.component';
import { UpdateTaskComponent } from './components/calendar/update-task/update-task.component';
import { TaskComponent } from './components/calendar/utilities/task/task.component';
import {AuthInterceptorProviders} from "./helpers/auth.interceptor";
import { WeatherLandingPageComponent } from './components/weather/weather-landing-page/weather-landing-page.component';
import { WeatherMainWidgetComponent } from './components/weather/weather-main-widget/weather-main-widget.component';
import { WeatherFiveDaysForecastComponent } from './components/weather/weather-five-days-forecast/weather-five-days-forecast.component';
import {FlashMessagesModule} from "flash-messages-angular";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {FullCalendarModule} from "@fullcalendar/angular";
import { FullCalendarComponent } from './components/calendar/full-calendar/full-calendar.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { UserTaskIsSharedWithComponent } from './components/calendar/utilities/user-task-is-shared-with/user-task-is-shared-with.component';
import { UserSmthIsSharedWithComponent } from './components/calendar/utilities/user-smth-is-shared-with/user-smth-is-shared-with.component';
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
    TaskComponent,
    FullCalendarComponent,
    TaskComponent,
    WeatherLandingPageComponent,
    WeatherMainWidgetComponent,
    WeatherFiveDaysForecastComponent,
    HeaderComponent,
    FooterComponent,
    UserTaskIsSharedWithComponent,
    UserSmthIsSharedWithComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FullCalendarModule,
    FormsModule,
    FullCalendarModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      autoDismiss: true,
      closeButton: true,
      progressBar: true,
      progressAnimation: "decreasing",
    }),

  ],
  providers: [
    AuthInterceptorProviders,
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
