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

  constructor(private http: HttpClient, private router: Router) { }

  // Login Modal
  private openLoginmodalSource = new Subject<void>();
  openLoginModal$ = this.openLoginmodalSource.asObservable();

  // 
  private authUser = new BehaviorSubject<any>(null);
  authUser$ = this.authUser.asObservable();

  // To check seller login or not
  private isSellerloginSource = new BehaviorSubject<boolean>(false);
  isSellerLoggedIn$ = this.isSellerloginSource.asObservable();


  // ✅ User observable
  isUserLoggedIn$ = this.authUser$.pipe(
    map(user => !!user && user.role === 'USER')
  );

  private openUserRegisterModalSource = new Subject<void>();
  openUserRegisterModal$ = this.openUserRegisterModalSource.asObservable();

  openRegisterModal() { 
    this.openUserRegisterModalSource.next();
  }
  // 
  seller = new BehaviorSubject<any>(null);
  private logoutTimer: any;


  // 🔹 SIGN UP
  signup(email: string, password: string, role: Role) {
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
      { email, password, returnSecureToken: true }
    ).pipe(
      switchMap(res =>
        this.saveUserRole(res.localId, email, role, res.idToken).pipe(
          tap(() => this.handleAuth(res, role))
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

  // ================= LOGIN =================
  login(email: string, password: string) {

    const userData = localStorage.getItem('authData');

    setTimeout(() => {
      if (userData) { 
        this.authUser.next(JSON.parse(userData)); 
      }
    }, 3000);
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

    if (role == 'SELLER') {
      this.isSellerloginSource.next(true); 
    }

    if (role == 'USER') {
      this.isSellerloginSource.next(false); 
    }

    // 🔥 2️⃣ Update seller state
    // this.authUser.next(role === 'SELLER'); 
    localStorage.setItem('authData', JSON.stringify(user));
    this.authUser.next(user);
    if (role === 'SELLER') {
      this.router.navigateByUrl('/seller/dashboard');
    } 
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

  // 
  isUser() {
    return this.role() === 'USER';
  }

  isSeller() {
    return this.role() === 'SELLER';
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

  openLoginModal() {
    this.openLoginmodalSource.next();
  }

}
