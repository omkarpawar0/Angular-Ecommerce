import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        let message = 'Something went wrong';

        // 🔥 Firebase REST API errors
        if (error.error?.error?.message) {
          message = this.firebaseError(error.error.error.message);
        }

        this.errorService.showError(message);
        return throwError(() => error);
      })
    );
  }

  firebaseError(code: string): string {
    switch (code) {
      case 'EMAIL_EXISTS':
        return 'Email already registered';
      case 'EMAIL_NOT_FOUND':
        return 'Email not found';
      case 'INVALID_PASSWORD':
        return 'Invalid password';
      case 'USER_DISABLED':
        return 'Account disabled';
      default:
        return code;
    }
  }
}
