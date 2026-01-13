import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserHeadComponent } from './user-head/user-head.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
    declarations: [
        UserLayoutComponent,
        UserHeadComponent,
        UserFooterComponent,
        ProductListComponent,
        ProductDetailsComponent,
        CartComponent,
        AddressComponent,
        PaymentComponent,
        
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class UserModule { }
