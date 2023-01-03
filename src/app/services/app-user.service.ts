import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:8080/api/app-user'
import {AppUser} from "../models/app-user";

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

  //todo : change any to proper TS model AppUser
  getAll(): Observable<any[]>{
    return this.http.get<any[]>(baseUrl);
  }

  //todo : change any to proper TS model AppUser
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
}
