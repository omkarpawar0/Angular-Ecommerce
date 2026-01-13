import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  addressForm = this.fb.group({
    name: [''],
    phone: [''],
    address: [''],
    city: [''],
    pincode: ['']
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  submit() {
    const user:any = this.auth.getCurrentUser();

    this.http.put(
      `${environment.firebase.rtdbUrl}/addresses/${user.uid}.json?auth=${user.token}`,
      this.addressForm.value
    ).subscribe(() => {
      this.router.navigate(['/cart/checkout/payment']);
    });
  }
}
