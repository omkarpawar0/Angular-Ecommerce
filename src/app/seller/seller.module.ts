import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerProductComponent } from './seller-product/seller-product.component';


@NgModule({
  declarations: [
    SellerProductComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule
  ]
})
export class SellerModule { }
