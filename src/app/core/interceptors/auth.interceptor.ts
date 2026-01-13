import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (
      req.url.includes('identitytoolkit.googleapis.com') ||
      req.url.includes('securetoken.googleapis.com')
    ) {
      return next.handle(req);
    }

    if (!req.url.includes('firebaseio.com')) {
      return next.handle(req);
    }

    const data = localStorage.getItem('authData');
    if (!data) return next.handle(req);

    const token = JSON.parse(data).idToken;
    if (!token) return next.handle(req);

    const authReq = req.clone({
      params: req.params.append('auth', token)
    });

    return next.handle(authReq);
  }
}
