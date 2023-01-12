import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../../models/task";
import * as Stream from "stream";

//Ici on a l'URL de notre backend créé avec Spring
const baseURL = 'http://localhost:8080/api/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]>{
    return this.http.get<any[]>(baseURL);
  }

  getEmailsAllUserSharedWith(): Observable<string[]>{
    return this.http.get<string[]>(`${baseURL}/share`);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseURL}/${id}`);
  }

  add(newTasks: Task): Observable<any> {
    return this.http.post(baseURL, newTasks);
  }

  update(updatedTask: Task): Observable<any> {
    return this.http.put(baseURL, updatedTask);
  }

  // update(updatedTask: Task): Observable<any> {
  //   const event = {updatedTask.get}
  //
  // }

  // update(updatedTaskStartDate: Date): Observable<Task> {
  //   const evantStartingDate = {updatedTaskStartDate}
  //   return this.http.put<Task>(baseURL, evantStartingDate);
  // }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseURL}/${id}`);
  }

  share(appUserToShareEmail: any, taskId: any): Observable<any> {
    const sharingRequest = {taskId, appUserToShareEmail};
    return this.http.put(`${baseURL}/share`, sharingRequest);
  }

  unshare(appUserToShareEmail: any, taskId: any): Observable<any> {
    const sharingRequest = {taskId, appUserToShareEmail};
    return this.http.request('delete', `${baseURL}/share`, {body: sharingRequest});
  }

  getAppUsersEmailWhomThisTaskIsSharedWith(taskId: string): Observable<string[]> {
    return this.http.get<string[]>(`${baseURL}/share/${taskId}`);
  }
}
