import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserHeadComponent } from './user-head/user-head.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
    declarations: [
        UserLayoutComponent,
        UserHeadComponent,
        UserFooterComponent,
        ProductListComponent,
        ProductDetailsComponent,
        
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule
    ]
})
export class UserModule { }
