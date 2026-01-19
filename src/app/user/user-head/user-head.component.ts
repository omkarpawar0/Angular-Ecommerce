import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-head',
  templateUrl: './user-head.component.html',
  styleUrls: ['./user-head.component.scss']
})
export class UserHeadComponent {
  @ViewChild('searchBox') searchBox!: ElementRef;
  search = '';
  suggestions: string[] = [];


  searchText = '';

  cartCount$ = this.cartService.getCartCount();

  allProducts = [
    'Mobile',
    'fashion',
    'Electronic',
    'Applicance',
    'Furniture',
    'Beauty'
  ];

  constructor(private authService: AuthService, private productService: UserService, private router: Router,public cartService: CartService) { }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.searchBox.nativeElement.contains(event.target)) {
      this.suggestions = []; // close suggestions
    }
  }
  openlogin() {
    this.authService.openLoginModal();
  }

  // 🔹 ONLY update suggestions
  onTyping() {
    if (!this.searchText.trim()) {
      this.suggestions = [];
      return;
    }

    // this.suggestions = this.allProducts.filter(p =>
    //   p.toLowerCase().includes(this.searchText.toLowerCase())
    // );
    // this.suggestions = this.productService.getAllProducts();
    //  this.suggestions = this.suggestions.filter(p =>
    //   p.toLowerCase().includes(this.searchText.toLowerCase())
    // );

    this.productService.getAllProducts().subscribe(products => {
 
      this.productService.getAllProducts().subscribe(products => {
        this.suggestions = products
          .flatMap(p => [p.name, p.category]) // ✅ both included
          .filter(Boolean)                    // remove null/undefined
          .filter(value =>
            value.toLowerCase().includes(this.searchText.toLowerCase())
          )
          .filter((value, index, self) => self.indexOf(value) === index) // remove duplicates
          .slice(0, 8); // limit suggestions
      });

    });

  }

  // 🔥 SEARCH ON ENTER
  onEnter() {
    if (!this.searchText.trim()) return;

    this.productService.search(this.searchText);
    this.suggestions = [];
    this.router.navigate(['/products']);
  }

  // 🔥 SEARCH ON CLICK
  selectSuggestion(value: string) {
    this.searchText = value;
    this.productService.search(value);
    this.suggestions = [];
    this.router.navigate(['/products']);
  }
}
