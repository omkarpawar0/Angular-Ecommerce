import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerLayoutComponent } from './seller-layout/seller-layout.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SellerProductComponent } from './seller-product/seller-product.component';
import { SellerGuard } from '../core/guards/seller.guard';

const routes: Routes = [
  {
    path: 'seller',
    component: SellerLayoutComponent,
    children: [
      {
        path: '',
        component: SellerDashboardComponent
      },
      {
        path: 'products',
        component:SellerProductComponent,
        canActivate: [SellerGuard]
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
