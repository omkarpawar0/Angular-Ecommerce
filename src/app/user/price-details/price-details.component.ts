import { Component } from '@angular/core';
import { map } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.scss']
})
export class PriceDetailsComponent {

  constructor(private cartService:CartService){

  }

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

}
