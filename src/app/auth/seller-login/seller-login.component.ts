import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.scss']
})
export class SellerLoginComponent {


  @ViewChild('closeBtn') closeBtn!: ElementRef<HTMLButtonElement>;
  loading = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: MessageService
  ) { }


  submit() {
    if (this.form.invalid) return;

    this.loading = true;

    const { email, password } = this.form.value;

    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'Welcome Seller'
        });
        this.form.reset();
        this.authService.authUser$.subscribe(user => {
          if (user) {
            this.authService.isSellerLoggedIn$.subscribe();
          }
        });
 
        this.closeBtn.nativeElement.click();
        this.router.navigate(['/seller/products']);
      },
      error: err => {
        this.toast.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: err.error?.error?.message || 'Something went wrong'
        });
        this.loading = false;
      }
    });
  }

}
