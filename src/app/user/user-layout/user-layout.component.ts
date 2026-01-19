import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {


  constructor(private cartService : CartService) {

  }

  ngOnInit(){ 
    this.cartService.loadCartOnce();

  } 


}
