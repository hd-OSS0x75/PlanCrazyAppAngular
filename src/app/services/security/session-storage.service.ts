import { Injectable } from '@angular/core';

const TOKEN_KEY = "auth-password";
const EMAIL_KEY = "auth-email";

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

  saveEmail(email: string) {
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }

  getEmail() {
    return window.sessionStorage.getItem(EMAIL_KEY);
  }

  clearSession(){
    window.sessionStorage.clear();
  }

}
