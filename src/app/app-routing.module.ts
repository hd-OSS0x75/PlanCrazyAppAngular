import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppuserProfileComponent} from "./components/appuser-profile/appuser-profile.component";
import {AppuserSigninComponent} from "./components/authentification/appuser-signin/appuser-signin.component";
import {AppuserSignupComponent} from "./components/authentification/appuser-signup/appuser-signup.component";
import {HomepageComponent} from "./components/authentification/homepage/homepage.component";
import {IsSignedInGuardService} from "./helpers/is-signed-in-guard.service";
import {AppUserHomepageComponent} from "./components/calendar/app-user-homepage/app-user-homepage.component";
import {AddTaskComponent} from "./components/calendar/add-task/add-task.component";
import {DetailsTaskComponent} from "./components/calendar/details-task/details-task.component";
import {UpdateTaskComponent} from "./components/calendar/update-task/update-task.component";
import {WeatherLandingPageComponent} from "./components/weather/weather-landing-page/weather-landing-page.component";

const routes: Routes = [
  { path  :'', redirectTo: 'homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomepageComponent },
  { path: 'signin', component: AppuserSigninComponent},
  { path: 'signup', component: AppuserSignupComponent },
  { path: 'profile', component: AppuserProfileComponent, canActivate: [IsSignedInGuardService] },
  { path: 'month', component: AppUserHomepageComponent, canActivate: [IsSignedInGuardService] },
  { path: 'task/add', component: AddTaskComponent, canActivate: [IsSignedInGuardService] },
  { path: 'task/details/:id', component: DetailsTaskComponent, canActivate: [IsSignedInGuardService] },
  { path: 'task/update/:id', component: UpdateTaskComponent, canActivate: [IsSignedInGuardService] },
  { path: 'weather-landing-page', component: WeatherLandingPageComponent, canActivate: [IsSignedInGuardService]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
