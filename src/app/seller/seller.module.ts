import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerProductComponent } from './seller-product/seller-product.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SellerLayoutComponent } from './seller-layout/seller-layout.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SellerHeaderComponent } from './seller-header/seller-header.component';
import { SellerFooterComponent } from './seller-footer/seller-footer.component';
import { SellerRegisterComponent } from '../auth/seller-register/seller-register.component';
import { SellerLoginComponent } from '../auth/seller-login/seller-login.component';
@NgModule({
  declarations: [
    SellerProductComponent,
    SellerLayoutComponent,
    SellerDashboardComponent,
    SellerHeaderComponent,
    SellerFooterComponent,
    SellerRegisterComponent,
    SellerLoginComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule,        // REQUIRED for ngModel
    TableModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule
  ]
})
export class SellerModule { }
