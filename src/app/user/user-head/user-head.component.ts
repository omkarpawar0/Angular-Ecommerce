import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-head',
  templateUrl: './user-head.component.html',
  styleUrls: ['./user-head.component.scss']
})
export class UserHeadComponent {


  constructor(private authService: AuthService) {

  }

  openlogin() {
    this.authService.openModal();
  }
}
