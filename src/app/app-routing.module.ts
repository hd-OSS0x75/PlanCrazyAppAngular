import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppuserProfileComponent} from "./components/appuser-profile/appuser-profile.component";
import {AppuserSigninComponent} from "./components/appuser-signin/appuser-signin.component";
import {AppuserSignupComponent} from "./components/appuser-signup/appuser-signup.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {IsSignedInGuardService} from "./helpers/is-signed-in-guard.service";

const routes: Routes = [
  { path  :'', redirectTo: 'homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomepageComponent },
  { path: 'signin', component: AppuserSigninComponent},
  { path: 'signup', component: AppuserSignupComponent },
  { path: 'appUsers/profile', component: AppuserProfileComponent, canActivate: [IsSignedInGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
