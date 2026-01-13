import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: UserDashboardComponent
      },
      {
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent
      },
      {
       path: 'cart',
       component:CartComponent
    }

    ]
  },

  {
    path: 'checkout',
    children: [
      { path: 'address', component: AddressComponent },
      { path: 'payment', component: PaymentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {

}
