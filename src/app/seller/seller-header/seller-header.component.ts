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

  // sellerData = localStorage.getItem('authData');
  // sellerDataa : any = JSON.parse(sellerData);

  sellerData :any;

  ngOnInit() { 

  const data = localStorage.getItem('authData');
  this.sellerData = data ? JSON.parse(data) : null; 

    this.authService.isSellerLoggedIn$.subscribe(isLogged => {
      this.islogin = isLogged;
    });
 

  }
 
  logout() {
    this.authService.logout();
    this.islogin = false;
  }

  ngAfterViewInit() {
    // this.openRegisterButton.nativeElement.click(); 
    

    if (this.sellerData  && this.sellerData.role == "SELLER" ) {
      this.islogin = true;
 

    } else { 
      this.islogin = false
      this.openRegisterButton.nativeElement.click();
    }
  }


} 
