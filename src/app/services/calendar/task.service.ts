import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../../models/task";

//Ici on a l'URL de notre backend créé avec Spring
const baseURL = 'http://localhost:8080/api/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  //todo: replace any by task model interface
  getAll(): Observable<any[]>{
    return this.http.get<any[]>(baseURL);
  }

  //TODO : SEGO - A EFFACER CAR SUREMENT INUTILE
  // getTasksByDate(): Observable<any>{
  //   return this.http.get<any[]>(baseURL);
  // }

  get(id: any): Observable<any> {
    return this.http.get(`${baseURL}/${id}`);
  }

  add(newTasks: Task): Observable<any> {
    return this.http.post(baseURL, newTasks);
  }

  update(updatedTask: Task): Observable<any> {
    return this.http.put(baseURL, updatedTask);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseURL}/${id}`);
  }
}
