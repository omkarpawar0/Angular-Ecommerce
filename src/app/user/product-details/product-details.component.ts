import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/core/models/seller';
import { CartService } from 'src/app/core/services/cart.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  quantity = 1;
  productId!: string;


  constructor(
    private route: ActivatedRoute,
    private productService: UserService, private cartService: CartService
  ) { }

  cart$ = this.cartService.cart$;


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id')!; 

      this.getProductById();
    });   
  }


  getProductById(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.product = products.find(p => p.id === this.productId); 
    });
  }

  addToCart() {
    const item: CartItem = {
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.imageUrl,
      discount: this.product.discount,
      qty: 1
    };

    this.cartService.addToCart(item);
  }
}
