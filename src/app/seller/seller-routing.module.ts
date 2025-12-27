import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerLayoutComponent } from './seller-layout/seller-layout.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';

const routes: Routes = [
  {
    path: 'seller',
    component: SellerLayoutComponent,
    children: [
      {
        path: '',
        component: SellerDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
