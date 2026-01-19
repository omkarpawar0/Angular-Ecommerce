import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { sellerProduct } from 'src/app/core/models/seller';
import { CartService } from 'src/app/core/services/cart.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: sellerProduct[] = [];
  filteredProducts: sellerProduct[] = [];

  currentSearchTerm = '';

  // filters
  selectedCategory = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  categories: string[] = [];

  private destroy$ = new Subject<void>();
  private productsLoaded = false;

  constructor(private productService: UserService) { }


  ngOnInit(): void {
    this.listenSearch();
    this.loadProducts(); 
  }

  // 🔥 Listen but don't filter until products are ready
  listenSearch(): void {
 
    this.productService.searchTerm$
      .pipe(takeUntil(this.destroy$))
      .subscribe(term => {
        this.currentSearchTerm = term || '';

        let minPrice: number | null = null;
        let maxPrice: number | null = null;

        if (this.productsLoaded) {
          this.applyFilters();
        }
      });
  }

  // 🔥 Load products first
  loadProducts(): void {
    this.productService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {

        this.products = products.filter(p => p.isActive === true);
        this.productsLoaded = true;

        this.categories = [
          ...new Set(this.products.map(p => p.category).filter(Boolean))
        ];

        this.applyFilters(); // ✅ always apply after load
      });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(p => {

      const matchesSearch =
        !this.currentSearchTerm ||
        p.name.toLowerCase().includes(this.currentSearchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(this.currentSearchTerm.toLowerCase());

      // const matchesCategory =
      //   !this.selectedCategory || p.category === this.selectedCategory;

      const matchesPrice =
        (!this.minPrice || p.price >= this.minPrice) &&
        (!this.maxPrice || p.price <= this.maxPrice);

      return matchesSearch && matchesPrice;
    });
  }

  clearFilters(): void {
    this.currentSearchTerm = '';
    this.selectedCategory = '';
    let minPrice: number | null = null;
    let maxPrice: number | null = null; 

    this.applyFilters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
