import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerLayoutComponent } from './seller/seller-layout/seller-layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./user/user.module').then(m => m.UserModule)
  },


  {
    path: '',
    loadChildren: () =>
      import('./seller/seller.module').then(m => m.SellerModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
