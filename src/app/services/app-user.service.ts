import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:8080/api/app-user'

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private http: HttpClient) {  }

  getAll(): Observable<any[]>{
    return this.http.get<any[]>(baseUrl);
  }
}
