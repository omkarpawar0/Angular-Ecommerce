import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, tap, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  private openLoginmodalSource = new Subject<void>();
  openLoginModal$ = this.openLoginmodalSource.asObservable();

  private isSellerLogedInSource = new BehaviorSubject<boolean>(false);
  isSellerLoggedIn$ = this.isSellerLogedInSource.asObservable();


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



  // 
  seller = new BehaviorSubject<any>(null);
  private logoutTimer: any;


  // 🔹 SIGN UP
  sellerSignup(email: string, password: string) {
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  // 🔹 LOGIN
  sellerLogin(email: string, password: string) {
    console.log('AuthService: sellerLogin called with');
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  // 🔹 HANDLE AUTH SUCCESS
  private handleAuth(res: any) {
    const expiresAt = new Date().getTime() + res.expiresIn * 1000;

    const seller = {
      email: res.email,
      localId: res.localId,
      idToken: res.idToken,
      refreshToken: res.refreshToken,
      expiresAt
    };

    this.isSellerLogedInSource.next(true);
    this.seller.next(seller);
    localStorage.setItem('sellerData', JSON.stringify(seller));

    this.autoLogout(res.expiresIn * 1000);
  }

  // 🔹 AUTO LOGIN
  autoLogin() {
    const data = localStorage.getItem('sellerData');
    if (!data) return;

    const seller = JSON.parse(data);
    if (seller.expiresAt > new Date().getTime()) {
      this.seller.next(seller);
      this.isSellerLogedInSource.next(true);

      this.autoLogout(seller.expiresAt - new Date().getTime());
    } else {
      this.logout();
    }
  }

  // 🔹 LOGOUT
  logout() {
    this.seller.next(null);
    localStorage.removeItem('sellerData');
    this.isSellerLogedInSource.next(false);
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
    this.router.navigateByUrl('/seller');
  }

  // 🔹 AUTO LOGOUT
  autoLogout(duration: number) {
    this.logoutTimer = setTimeout(() => {
    this.logout();
      alert('Session expired. Logged out automatically');
      this.isSellerLogedInSource.next(true);
      this.router.navigateByUrl('/seller');

    }, duration);
  }

  // 🔹 REFRESH TOKEN
  refreshToken(refreshToken: string) {
    const params = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    return this.http.post<any>(
      `https://securetoken.googleapis.com/v1/token?key=${environment.firebase.apiKey}`,
      params
    );
  }

}
