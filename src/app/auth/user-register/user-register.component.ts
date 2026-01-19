import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService, Role } from 'src/app/core/services/auth.service';
import { ErrorService } from 'src/app/core/services/error.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {


  @Input() role: Role = 'USER';

  private sub!: Subscription;

  @ViewChild('openRegisterButton') openRegisterBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeUserRegBtn')  closeUserRegBtn!:ElementRef<HTMLButtonElement>;

  constructor(private auth: AuthService, private fb: FormBuilder,private errorService: ErrorService) { }

  ngOnInit() {
    this.sub = this.auth.openUserRegisterModal$.subscribe(() => { 
      this.openUserRegistrationModal();
      this.closeUserRegBtn.nativeElement.click();
    });
  }

  ngAfterViewInit() {
  }

  openUserRegistrationModal() {
    if (!this.openRegisterBtn) {
      return;
    }

    this.openRegisterBtn.nativeElement.click();
  }

  form = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        
      ]
    ]
  });

  // 🔹 getters for template
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // 🔥 show errors
      return;
    } 
    const { email, password } = this.form.value;
 
    // call authService.signup(...)
    this.auth.signup(email!, password!, 'USER').subscribe();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
