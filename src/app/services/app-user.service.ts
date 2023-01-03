import { Injectable } from '@angular/core';
import {AppUser} from "../models/app-user";
import {HttpClient} from "@angular/common/http";

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


}
