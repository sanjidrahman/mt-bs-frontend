import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let userToken = localStorage.getItem('userToken')
    if (userToken) {
      let newRequest = request.clone({
        setHeaders: { Authorization: 'Bearer ' + userToken },
      })
      return next.handle(newRequest);
    }
    let newRequest = request.clone({})
    return next.handle(newRequest)
  }
}
