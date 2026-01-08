import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.scss']
})
export class SellerHeaderComponent {


  @ViewChild('openRegisterButton') openRegisterButton: any;

  islogin: boolean = false;

  constructor(private authService: AuthService) {

  }
  sellerData = localStorage.getItem('sellerData');

  ngOnInit() {

    if (this.sellerData) {
      this.islogin = true;
    } else {
      this.openRegisterButton.nativeElement.click();
    }

    this.authService.isSellerLoggedIn$.subscribe(isLogged => {
      this.islogin = isLogged;
      console.log('SellerHeaderComponent: islogin updated to', this.islogin);
    });

  }

  logout() {
    this.authService.logout();
  }

  ngAfterViewInit() {
    // this.openRegisterButton.nativeElement.click(); 
    
    if (this.sellerData) { 
      this.islogin = true;

    } else { 
      this.islogin = false
      this.openRegisterButton.nativeElement.click();
    }
  }


} 
