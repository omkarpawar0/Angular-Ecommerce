import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/core/models/seller';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private router: Router,
    private auth: AuthService
  ) { }

  cart$ = this.cartService.cart$;

  // 🔥 PRICE DETAILS (derived from cart)
  priceDetails$ = this.cart$.pipe(

    map(items => {
      debugger
      const price = items.reduce((sum, i) => sum + i.price * i.qty, 0);
      // const discountData =  price * (items.discount / 100);  
      const discountData = items.reduce(
        (sum, i) => sum + (i.price * i.qty * i.discount / 100),
        0
      );
      const platformFee = items.length ? 7 : 0;
      const total = price - discountData + platformFee;
      const count = items.reduce((s, i) => s + i.qty, 0);

      return {
        price,
        discountData,
        platformFee,
        total,
        savings: price - total,
        count
      };
    })
  );



  ngOnInit() { 
    // this.cartService.loadCartOnce();
     
  }

  increase(item: CartItem) {
    this.cartService.updateQty(item.productId, +1);
  }

  decrease(item: CartItem) {
    if (item.qty > 1) {
      this.cartService.updateQty(item.productId, -1);
    }
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item.productId);
  }

  checkout() {
    if (!this.auth.isLoggedIn()) {
      this.auth.openLoginModal();
      return;
    }
    this.router.navigate(['/checkout']);
  }
}
