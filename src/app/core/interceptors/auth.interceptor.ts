import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // 🚫 Skip Firebase Auth APIs
    if (
      req.url.includes('identitytoolkit.googleapis.com') ||
      req.url.includes('securetoken.googleapis.com')
    ) {
      return next.handle(req);
    }

    // ✅ Only attach token to Firebase RTDB
    if (!req.url.includes('firebaseio.com')) {
      return next.handle(req);
    }

    const sellerData = localStorage.getItem('sellerData');
    if (!sellerData) {
      return next.handle(req);
    }

    const { idToken } = JSON.parse(sellerData);
    if (!idToken) {
      return next.handle(req);
    }

    // ✅ Preserve existing params
    const authReq = req.clone({
      params: req.params.append('auth', idToken)
    });

    console.log('Auth Interceptor attached token');
    return next.handle(authReq);
  }
}
