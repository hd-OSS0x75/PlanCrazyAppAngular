import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppUser} from "../../models/app-user";

//Ici on a l'URL de notre backend créé avec Spring
const baseUrl = 'http://localhost:8080/api/app-user';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private http: HttpClient) { }

  updateAppUser(appUser: AppUser) {
    return this.http.put(`${baseUrl}`, appUser);
  }

  get(): Observable<any> {
    return this.http.get(`${baseUrl}`);
  }
}
