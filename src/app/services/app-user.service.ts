import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:8080/api/app-user'

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private http: HttpClient) {  }

  //todo : change any to proper TS model AppUser
  getAll(): Observable<any[]>{
    return this.http.get<any[]>(baseUrl);
  }

  //todo : change any to proper TS model AppUser
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
}
