import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class userGuard implements CanActivate {

  
  constructor(private auth: AuthService, private router: Router) {}

  userData = localStorage.getItem('authData');
  data :any= this.userData ?  JSON.parse(this.userData) : null;

  canActivate(): boolean {
    if ( this.userData && this.data.role == "USER" ) { 
 
      return true;
    }
    // this.router.navigate(['/login']);
      this.auth.openLoginModal(); 
      this.router.navigateByUrl('/')
    return false;
  }
}
