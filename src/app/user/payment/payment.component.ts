import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CartItem } from 'src/app/core/models/seller';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  cartItems: CartItem[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    });
  }

  placeOrder() {
    const user:any = this.auth.getCurrentUser();

    const order = {
      items: this.cartItems,
      total: this.total,
      createdAt: Date.now()
    };

    this.http.post(
      `${environment.firebase.rtdbUrl}/orders/${user.uid}.json?auth=${user.token}`,
      order
    ).subscribe(() => {
      this.cartService.clearCart();
      alert('Order placed successfully');
    });
  }
}
