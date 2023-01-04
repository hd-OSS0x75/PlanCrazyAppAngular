import { Injectable } from '@angular/core';

const PASSWORD_KEY = "auth-password";
const APP_USER_EMAIL_KEY = "auth-email";
const APP_USER_ID_KEY = "auth-id";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  //todo - security : change  to token saving (method saveToken()), define const TOKEN_KEY
  savePassword(password: string){
    window.sessionStorage.setItem(PASSWORD_KEY, password);
  }

  //todo - security : method getToken() instead, define const TOKEN_KEY.
  getPassword(){
    return window.sessionStorage.getItem(PASSWORD_KEY);
  }

  //todo - security : define const APP-USER-EMAIL_KEY
  saveAppUserEmail(email: string){
    window.sessionStorage.setItem(APP_USER_EMAIL_KEY, email);
  }

  //todo - security :  define const APP-USER-EMAIL_KEY
  getAppUserEmail(){
    return window.sessionStorage.getItem(APP_USER_EMAIL_KEY);
  }

  saveAppUserId(userId: string) {
    window.sessionStorage.setItem(APP_USER_ID_KEY, userId);
  }

  getAppUserId() {
    return window.sessionStorage.getItem(APP_USER_ID_KEY);
  }

  clearSession(){
    window.sessionStorage.clear();
  }

}
