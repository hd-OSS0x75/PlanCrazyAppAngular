import { Injectable } from '@angular/core';

const TOKEN_KEY = "auth-password";
const APP_USER_ID_KEY = "auth-id";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  saveToken(token: string){
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken() {
    return window.sessionStorage.getItem(TOKEN_KEY);
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
