import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private productService: UserService
  ) {}

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.productId = params.get('id')!;
    console.log('Route Product ID:', this.productId);

    this.getProductById();
  });
}


  getProductById(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.product = products.find(p => p.id === this.productId);
      console.log('Fetched product details:', this.product);
    });
  }

  addToCart(): void {
    console.log('Added to cart:', this.product, 'Qty:', this.quantity);
  }
}
