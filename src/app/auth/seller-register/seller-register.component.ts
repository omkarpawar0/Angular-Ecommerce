import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorService } from 'src/app/core/services/error.service';

@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.scss']
})
export class SellerRegisterComponent {

  constructor(private authService: AuthService, private fb: FormBuilder, private errorService: ErrorService) { }
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });



  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onRegister() {
    if (this.registerForm.invalid) return;



    const { email, password } = this.registerForm.value;

    this.authService.sellerSignup(email!, password!)
      .subscribe({
        next: () => {
          this.errorService.showSuccess('Registration successful');
          setTimeout(() => {
            this.registerForm.reset();
          }, 1200);
        },
        error: err => {

        }
      });
  }

}
