import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.scss']
})
export class SellerHeaderComponent {
  islogin: boolean = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    const sellerData = localStorage.getItem('sellerData');

    if (sellerData) {
      this.islogin = true;
    } else {
      this.islogin = false
    }

    this.authService.isSellerLoggedIn$.subscribe(isLogged => {
      this.islogin = isLogged;
      console.log('SellerHeaderComponent: islogin updated to', this.islogin);
    });

  }

  logout() {
    this.authService.logout();
  }


} 
