import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppUser} from "../../models/app-user";

//Ici on a l'URL de notre backend créé avec Spring
const baseURL = 'http://localhost:8080/api/app-user';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private http: HttpClient) { }

  addAppUser(newAppUSer: AppUser) {
    return this.http.post(baseURL, newAppUSer);
  }

  getAll(): Observable<AppUser[]>{
    return this.http.get<AppUser[]>(baseURL);
  }

  get(): Observable<any> {
    return this.http.get(`${baseURL}`);
  }
}
