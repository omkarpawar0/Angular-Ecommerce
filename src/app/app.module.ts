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
import { SellerLoginComponent } from './auth/seller-login/seller-login.component';
import { SellerRegisterComponent } from './auth/seller-register/seller-register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    UserLoginComponent,
    UserRegisterComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
