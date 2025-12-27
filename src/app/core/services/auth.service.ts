import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private openLoginmodalSource = new Subject<void>();
  openLoginModal$ = this.openLoginmodalSource.asObservable();

  // private openUserRegisterSource = new Subject<void>();
  // openUserRegisterModal$ = this.openUserRegisterSource.asObservable();

  openModal() {
    this.openLoginmodalSource.next();
  }

  private openUserRegisterModalSource = new Subject<void>();
  openUserRegisterModal$ = this.openUserRegisterModalSource.asObservable();

  openRegisterModal() {
    console.log('SERVICE: openRegisterModal called');
    this.openUserRegisterModalSource.next();
  }

}
