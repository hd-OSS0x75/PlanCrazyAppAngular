import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  //todo : add user id in the storage session

  //todo - security : change  to token saving (method saveToken()), define const TOKEN_KEY
  savePassword(password: string){
    window.sessionStorage.setItem('auth-password', password);
  }

  //todo - security : method getToken() instead, define const TOKEN_KEY.
  getPassword(){
    return window.sessionStorage.getItem('auth-password');
  }

  //todo - security : define const APP-USER-EMAIL_KEY
  saveAppUserEmail(email: string){
    window.sessionStorage.setItem('auth-email', email);
  }

  //todo - security :  define const APP-USER-EMAIL_KEY
  getAppUserEmail(){
    return window.sessionStorage.getItem('auth-email');
  }

  clearSession(){
    window.sessionStorage.clear();
  }
}
