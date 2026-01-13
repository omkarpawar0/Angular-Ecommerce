import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, tap, Subject, switchMap, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export type Role = 'USER' | 'SELLER';

@Injectable({
  providedIn: 'root'
})

export class AuthService {




  constructor(private http: HttpClient, private router: Router) {

  }

  private openLoginmodalSource = new Subject<void>();
  openLoginModal$ = this.openLoginmodalSource.asObservable();

  private authUser = new BehaviorSubject<any>(null);
  authUser$ = this.authUser.asObservable();


  private isSellerloginSource = new BehaviorSubject<boolean>(false);
  isSellerLoggedIn$ = this.isSellerloginSource.asObservable();


  // ✅ Seller observable
  // isSellerLoggedIn$ = this.authUser$.pipe(
  //   map(user => !!user && user.role === 'SELLER')
  // );

  // ✅ User observable
  isUserLoggedIn$ = this.authUser$.pipe(
    map(user => !!user && user.role === 'USER')
  );

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
  signup(email: string, password: string) {
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
      { email, password, returnSecureToken: true }
    ).pipe(
      switchMap(res =>
        this.saveUserRole(res.localId, email, 'SELLER', res.idToken).pipe(
          tap(() => this.handleAuth(res, 'SELLER'))
        )
      )
    );
  }

  private saveUserRole(uid: string, email: string, role: any, token: string) {
    return this.http.put(
      `${environment.firebase.rtdbUrl}/users/${uid}.json?auth=${token}`,
      { email, role }
    );
  }


  // 🔹 LOGIN

  // ================= LOGIN =================
  login(email: string, password: string) {

    // if (this.userData) {
    //   this.authUser.next(JSON.parse(this.userData));

    const userData = localStorage.getItem('authData');

    debugger
    setTimeout(() => {
      if (userData) {
        console.log('AuthService: Found user data in localStorage during login');
        this.authUser.next(JSON.parse(userData));
        console.log('AuthService: Loaded user from localStorage', this.authUser.value);
      }
    }, 3000);
    // }

    console.log('AuthService: login called with email:', email);

    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
      { email, password, returnSecureToken: true }

    ).pipe(
      switchMap(res =>
        this.getUserRole(res.localId, res.idToken).pipe(
          tap(role => this.handleAuth(res, role))
        )
      )
    );
  }


  // ================= GET ROLE =================
  private getUserRole(uid: string, token: string) {
    return this.http
      .get<any>(`${environment.firebase.rtdbUrl}/users/${uid}.json?auth=${token}`)
      .pipe(map(res => res.role));
  }

  // ================= HANDLE AUTH =================
  private handleAuth(res: any, role: Role) {
    const user = {
      uid: res.localId,
      email: res.email,
      role,
      idToken: res.idToken,
      expiresAt: Date.now() + res.expiresIn * 1000
    };

    this.isSellerloginSource.next(true);



    // 🔥 2️⃣ Update seller state
    // this.authUser.next(role === 'SELLER');

    console.log('Authenticated user:', this.authUser.value);
    localStorage.setItem('authData', JSON.stringify(user));
    this.authUser.next(user);
    role === 'SELLER'
      ? this.router.navigateByUrl('/seller/dashboard')
      : this.router.navigateByUrl('/');

    console.log('User role after login:', this.isSellerLoggedIn$);
  }

  // ================= AUTO LOGIN =================
  autoLogin() {
    const data = localStorage.getItem('authData');
    if (!data) return;

    const user = JSON.parse(data);
    if (user.expiresAt > Date.now()) {
      this.authUser.next(user);
    } else {
      this.logout();
    }
  }

  // ================= LOGOUT =================
  logout() {
    localStorage.removeItem('authData');
    this.authUser.next(null);
    this.router.navigateByUrl('/seller');
  }

  // ================= HELPERS =================
  get token() {
    return JSON.parse(localStorage.getItem('authData') || '{}')?.idToken;
  }

  get role() {
    return JSON.parse(localStorage.getItem('authData') || '{}')?.role;
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

  getCurrentUser() {

    return this.authUser.value;

    throw new Error('Method not implemented.');
  }

  isLoggedIn(): boolean {
    return !!this.authUser.value;
  }

}
