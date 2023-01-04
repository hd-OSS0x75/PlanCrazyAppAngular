import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionStorageService} from "./session-storage.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private appUserLoggedIn: boolean = false;
  //
  // isAppUserLoggedIn(){
  //   return this.appUserLoggedIn;
  // }
  private loggedIn = new BehaviorSubject<boolean>(!!this.sessionStorage.getAppUserId());

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  isConnected() {
    return this.sessionStorage.getAppUserId() ? true : false;
  }

  constructor(private sessionStorage: SessionStorageService) { }

  //todo - security : change signature to an observable method, post url signin
  login(email: string, password: string, userId: string) {
    // const signinRequest = {email, password};
    this.sessionStorage.saveAppUserEmail(email);//à priori en réception un userId et un token
    this.sessionStorage.savePassword(password);
    this.sessionStorage.saveAppUserId(userId);
    this.loggedIn.next(true);
  }

  logout() {
    this.sessionStorage.clearSession();
    this.loggedIn.next(false);
  }
}
