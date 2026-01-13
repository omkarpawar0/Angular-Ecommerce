import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent
  implements OnInit, AfterViewInit, OnDestroy {

  private sub!: Subscription;

  @ViewChild('openButton') openBtn!: ElementRef<HTMLButtonElement>;

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit() {
    this.sub = this.authService.openLoginModal$.subscribe(() => {
      this.openModal();
    });

    // Manage after login cart merging
    // this.cartService.mergeLocalCartToUser();

  }

  ngAfterViewInit() {
  }

  openModal() {
    if (!this.openBtn) {
      console.log('Button not ready yet');
      return;
    }

    console.log('calling login');
    this.openBtn.nativeElement.click();
  }

  OpenRegModal() {
    this.authService.openRegisterModal();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
