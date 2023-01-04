import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionStorageService} from "./session-storage.service";
import {BehaviorSubject, map, Observable} from "rxjs";

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

  //todo - security : change signature to an observable method, post url signin
  login(email: string, password: string): Observable<boolean> {
    const signinRequest = {email, password};
    return this.http.post<any>(`${this.BASE_URL}/signin`, signinRequest)
      .pipe(
        map((jwtResponse: any) => {
          console.log(jwtResponse);
          this.sessionStorage.saveToken(jwtResponse.token);
          this.sessionStorage.saveAppUserId(jwtResponse.userId);
          this.loggedIn.next(true);
          return true;
        })
      );
  }
  // login(email: string, password: string, userId: string) {
  //   // const signinRequest = {email, password};
  //   this.sessionStorage.saveAppUserEmail(email);//à priori en réception un userId et un token
  //   this.sessionStorage.saveToken(password);
  //   this.sessionStorage.saveAppUserId(userId);
  //   this.loggedIn.next(true);
  // }

  logout() {
    this.sessionStorage.clearSession();
    this.loggedIn.next(false);
  }
}
