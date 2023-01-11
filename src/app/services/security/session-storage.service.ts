import { Injectable } from '@angular/core';

const TOKEN_KEY = "auth-password";
const NICKNAME_KEY = "auth-nickname";

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

  saveNickname(nickname: string) {
    window.sessionStorage.setItem(NICKNAME_KEY, nickname);
  }

  getNickname() {
    return window.sessionStorage.getItem(NICKNAME_KEY);
  }

  clearSession(){
    window.sessionStorage.clear();
  }

}
