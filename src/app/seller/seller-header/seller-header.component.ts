import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.scss']
})
export class SellerHeaderComponent {


  @ViewChild('openRegisterButton') openRegisterButton: any;

  islogin: boolean = false;
  isSeller$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isSeller$ = this.authService.isSellerLoggedIn$;
  }

  sellerData = localStorage.getItem('authData');

  ngOnInit() {


    console.log('Seller Data from localStorage: dmsfdesfn');

    this.authService.isSellerLoggedIn$.subscribe(isLogged => {
      this.islogin = isLogged;
    });

    console.log('Is Seller Logged In:', this.islogin);

  }
 
  logout() {
    this.authService.logout();
    this.islogin = false;
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
