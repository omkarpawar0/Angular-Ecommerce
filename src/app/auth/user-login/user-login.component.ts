import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
  @ViewChild('closeBtn') closeBtn!:ElementRef<HTMLButtonElement>;

  constructor(private authService: AuthService, private cartService: CartService,private fb: FormBuilder,private toast:MessageService) { }

  ngOnInit() {
    this.sub = this.authService.openLoginModal$.subscribe(() => {
      this.openModal();
    });
  }

  ngAfterViewInit() {
  }

   form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  login() { 
    if (this.form.invalid) return;
    const { email, password } = this.form.value;  

    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'Welcome Seller'
        });

        this.closeBtn.nativeElement.click();
        this.form.reset();
        this.authService.authUser$.subscribe(user => {
          if (user) {
            this.authService.isSellerLoggedIn$.subscribe();
          }
        });
 
        // this.closeBtn.nativeElement.click();
        // this.router.navigate(['/seller/products']);
      },
      error: err => {
        this.toast.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: err.error?.error?.message || 'Something went wrong'
        });
        // this.loading = false;
      }
    });
  }

  openModal() {
    if (!this.openBtn) { 
      return;
    } 
    this.openBtn.nativeElement.click();
  }

  OpenRegModal() {
    this.authService.openRegisterModal();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  
}
