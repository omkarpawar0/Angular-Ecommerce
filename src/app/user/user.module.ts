import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserHeadComponent } from './user-head/user-head.component';
import { UserFooterComponent } from './user-footer/user-footer.component';

@NgModule({
    declarations: [
        UserLayoutComponent,
        UserHeadComponent,
        UserFooterComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule
    ]
})
export class UserModule { }
