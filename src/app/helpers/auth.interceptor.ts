import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs';
import {SessionStorageService} from "../services/security/session-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionStorage: SessionStorageService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentRequest = req;

    const token = this.sessionStorage.getToken();

    if(token && !currentRequest.url.match('api.openweathermap.org')) {
      currentRequest = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)})
    }
    return next.handle(currentRequest);
  }
}


export const AuthInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
]
