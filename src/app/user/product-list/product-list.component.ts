import { Component } from '@angular/core';
import { sellerProduct } from 'src/app/core/models/seller';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  products: sellerProduct[] = [];
  filteredProducts: sellerProduct[] = [];
  searchTerm = '';

  // filters
  searchText = '';
  selectedCategory = '';
  minPrice = 0;
  maxPrice = 0;

  categories: string[] = [];

  constructor(private productService: UserService) { }

  ngOnInit() {
    this.loadProducts();
    this.applyFilters();

    // filter ONLY when search triggered
    this.productService.searchTerm$.subscribe(term => {
      this.filteredProducts = this.products.filter(p =>
        p.name.toLowerCase().includes(term.toLowerCase())
      );
    });
  }



  loadProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = this.products.filter(p => p.isActive == true);

      // extract unique categories
      this.categories = [
        ...new Set(products.map(p => p.category).filter(Boolean))
      ];
    });
  }

  applyFilters() {

    this.filteredProducts = this.products.filter(p => {

      const matchesSearch =
        !this.searchText ||
        p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        p.brand?.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesCategory =
        !this.selectedCategory || p.category === this.selectedCategory;

      const matchesPrice =
        (!this.minPrice || p.price >= this.minPrice) &&
        (!this.maxPrice || p.price <= this.maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    });
  }

  clearFilters() {
    this.searchText = '';
    this.selectedCategory = '';
    this.minPrice = 0;
    this.maxPrice = 0; 
  }

}
