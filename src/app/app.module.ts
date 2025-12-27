import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SellerLayoutComponent } from './seller/seller-layout/seller-layout.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserRoutingModule } from './user/user-routing.module';
import { UserLoginComponent } from './auth/user-login/user-login.component';
import { UserRegisterComponent } from './auth/user-register/user-register.component';
import { SellerHeaderComponent } from './seller/seller-header/seller-header.component';
import { SellerFooterComponent } from './seller/seller-footer/seller-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SellerLayoutComponent,
    SellerDashboardComponent,
    UserDashboardComponent,
    UserLoginComponent,
    UserRegisterComponent,
    SellerHeaderComponent,
    SellerFooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
