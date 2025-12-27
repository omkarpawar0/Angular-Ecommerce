import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {



  private sub!: Subscription;

  @ViewChild('openRegisterButton') openRegisterBtn!: ElementRef<HTMLButtonElement>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.sub = this.authService.openUserRegisterModal$.subscribe(() => {

      console.log("register component not fun")
      this.openUserRegistrationModal();
    });
  }

  ngAfterViewInit() {
  }

  openUserRegistrationModal() {
    if (!this.openRegisterBtn) {
      console.log('Button not ready yet');
      return;
    }

    console.log('calling login');
    this.openRegisterBtn.nativeElement.click();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
