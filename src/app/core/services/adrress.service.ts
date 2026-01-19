import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdrressService {


  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getAddresses() { 
    return this.http.get(
      `${environment.firebase.rtdbUrl}/addresses/${this.auth.getCurrentUser().uid}.json?auth=${this.auth.token}`
    );
  }

  addAddress(address: any) {
    return this.http.post(
      `${environment.firebase.rtdbUrl}/addresses/${this.auth.getCurrentUser().uid}.json?auth=${this.auth.token}`,
      address
    );
  }

  removeAddress(addressId: string) {
    return this.http.delete(
      `${environment.firebase.rtdbUrl}/addresses/${this.auth.getCurrentUser().uid}/${addressId}.json?auth=${this.auth.token}`
    );
  }
}
