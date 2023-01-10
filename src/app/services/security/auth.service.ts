import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionStorageService} from "./session-storage.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {AppUser} from "../../models/app-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://localhost:8080/api/auth';

  private loggedIn = new BehaviorSubject<boolean>(!!this.sessionStorage.getToken());

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  isConnected() {
    return this.sessionStorage.getToken() ? true : false;
  }

  constructor(private http: HttpClient,
              private sessionStorage: SessionStorageService) { }

  login(email: string, password: string): Observable<boolean> {
    const signinRequest = {email, password};
    return this.http.post<any>(`${this.BASE_URL}/signin`, signinRequest)
      .pipe(
        map((jwtResponse: any) => {
          console.log(jwtResponse);
          this.sessionStorage.saveToken(jwtResponse.token);
          this.sessionStorage.saveNickname(jwtResponse.nickname);
          this.loggedIn.next(true);
          return true;
        })
      );
  }

  addAppUser(newAppUSer: AppUser) {
    return this.http.post(`${this.BASE_URL}/signup`, newAppUSer);
  }

  logout() {
    this.sessionStorage.clearSession();
    this.loggedIn.next(false);
  }
}
