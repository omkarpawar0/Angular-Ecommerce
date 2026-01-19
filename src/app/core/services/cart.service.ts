import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/seller';
import { BehaviorSubject, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  private selectedAddressSource = new BehaviorSubject<any>(null);
  selectedAddress$ = this.selectedAddressSource.asObservable();

  // 🔥 Prevent duplicate HTTP calls
  private cartLoaded = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  /* ---------------- LOAD CART ONCE ---------------- */
  loadCartOnce() {
    if (this.cartLoaded) return;
    this.cartLoaded = true;

    const user: any = this.auth.getCurrentUser();

    if (user) {
      this.http.get<CartItem[]>(
        `${environment.firebase.rtdbUrl}/carts/${user.uid}.json?auth=${user.token}`
      ).pipe(take(1))
        .subscribe(cart => {
          this.cartSubject.next(cart || []);
        });
    } else {
      const local = JSON.parse(localStorage.getItem('cart') || '[]'); 
      this.cartSubject.next(local);
    }
  }

  /* ---------------- ADD TO CART ---------------- */
  addToCart(item: CartItem) {
 
    const cart = [...this.cartSubject.value];
    const index = cart.findIndex(i => i.productId === item.productId);

    index > -1 ? cart[index].qty++ : cart.push({ ...item, qty: 1 });
    this.persist(cart);
  }

  //  
  setAddress(address: any) {
    this.selectedAddressSource.next(address);
  }

  /* ---------------- UPDATE QTY (+ / -) ---------------- */
  updateQty(productId: string, change: number) {
    let cart = [...this.cartSubject.value];
    const index = cart.findIndex(i => i.productId === productId); 
    if (index === -1) return;

    cart[index].qty += change;

    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }

    this.persist(cart);
  }

  /* ---------------- REMOVE ITEM ---------------- */
  removeItem(productId: string) {
    const cart = this.cartSubject.value.filter(
      item => item.productId !== productId
    );
    this.persist(cart);
  }

  /* ---------------- CART BADGE COUNT ---------------- */
  getCartCount() {
    return this.cart$.pipe(
      map(cart => cart.reduce((sum, i) => sum + i.qty, 0))
    );
  }

  /* ---------------- MERGE AFTER LOGIN ---------------- */
  mergeLocalCartToUser() {
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const user: any = this.auth.getCurrentUser();

    if (!user || !localCart.length) return;

    this.http.put(
      `${environment.firebase.rtdbUrl}/carts/${user.uid}.json?auth=${user.token}`,
      localCart
    ).pipe(take(1))
      .subscribe(() => {
        localStorage.removeItem('cart');
        this.cartSubject.next(localCart);
      });
  }

  /* ---------------- CLEAR CART ---------------- */
  clearCart() {
    const user: any = this.auth.getCurrentUser();

    if (user) {
      this.http.delete(
        `${environment.firebase.rtdbUrl}/carts/${user.uid}.json?auth=${user.token}`
      ).pipe(take(1)).subscribe();
    }

    localStorage.removeItem('cart');
    this.cartSubject.next([]);
  }

  /* ---------------- SAVE CART (SINGLE PLACE) ---------------- */
  private persist(cart: CartItem[]) {
    const user: any = this.auth.getCurrentUser();

    // 🔥 Optimistic UI update
    this.cartSubject.next(cart); 


    if (user) { 
      this.http.put(
        `${environment.firebase.rtdbUrl}/carts/${user.uid}.json?auth=${user.token}`,
        cart
      ).pipe(take(1)).subscribe();
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
}
