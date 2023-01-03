import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionStorageService} from "./session-storage.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAppUserLoggedIn: boolean = false; //todo : define as Observable as done with Boris

  constructor(private sessionStorage: SessionStorageService) { }

  //todo - security : change signature to an observable method, post url signin
  login(email: string, password: string, userId: string) {
    // const signinRequest = {email, password};
    this.sessionStorage.saveAppUserEmail(email);
    this.sessionStorage.savePassword(password);
    this.sessionStorage.saveAppUserId(userId);
    this.isAppUserLoggedIn = true;
  }

  logout() {
    this.sessionStorage.clearSession();
    this.isAppUserLoggedIn = false; //todo : define as Observable as done with Boris
  }
}
