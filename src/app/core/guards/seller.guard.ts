import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SellerGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const data = localStorage.getItem('authData');
    if (!data) {
      this.router.navigateByUrl('/login');
      return false;
    }

    const user = JSON.parse(data);
    if (user.role !== 'SELLER') {
      this.router.navigateByUrl('/seller');
      return false;
    }

    return true;
  }
}
