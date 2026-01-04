import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-head',
  templateUrl: './user-head.component.html',
  styleUrls: ['./user-head.component.scss']
})
export class UserHeadComponent {
  search = '';
  suggestions: string[] = [];

  searchText = '';



  allProducts = [
    'Mobile',
    'fashion',
    'Electronic',
    'Applicance',
    'Furniture',
    'Beauty'
  ];

  constructor(private authService: AuthService, private productService: UserService, private router: Router) { }

  openlogin() {
    this.authService.openModal();
  }

  // 🔹 ONLY update suggestions
  onTyping() {
    if (!this.searchText.trim()) {
      this.suggestions = [];
      return;
    }

    this.suggestions = this.allProducts.filter(p =>
      p.toLowerCase().includes(this.searchText.toLowerCase())
    );
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
