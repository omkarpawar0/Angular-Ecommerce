import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs'; 
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {

    if (localStorage.getItem('sellerData')) {
      return true;
    }
    this.router.navigate(['/seller']);
    return false;
  }
  
}
