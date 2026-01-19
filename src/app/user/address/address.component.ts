import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdrressService } from 'src/app/core/services/adrress.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  addresses: any[] = [];
  selectedAddress: any;

  addressForm !: FormGroup;
  @ViewChild('closeAddressBtn') closeAddressBtn!:ElementRef<HTMLButtonElement>;

  constructor(
    private fb: FormBuilder,
    private addressService: AdrressService,
    private CartService: CartService,
    private router: Router,
    private toast: MessageService

  ) { }

  ngOnInit() {
    this.loadAddresses();

    this.addressForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [
        Validators.required,
        Validators.pattern('^[6-9][0-9]{9}$')
      ]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{6}$')
      ]]
    });
  }

  get f() {
    return this.addressForm.controls;
  }

  loadAddresses() {
    this.addressService.getAddresses().subscribe((res: any) => {
      this.addresses = [];
      for (let key in res) {
        this.addresses.push({ id: key, ...res[key] });
      }
    });

    this.continueToPayment();
  }

  addAddress() { 
    if (this.addressForm.invalid) return;

    this.addressService.addAddress(this.addressForm.value)
      .subscribe(() => { 
        this.addressForm.reset();
        this.loadAddresses();
        this.toast.add({
          severity: 'success',
          summary: 'success',
          detail: 'Address Added Successfully'
        });

        this.closeAddressBtn.nativeElement.click(); 
      });
    this.continueToPayment();

  }

  deleteAddress(id: string) {
    this.addressService.removeAddress(id)
      .subscribe(() => this.loadAddresses());
    this.continueToPayment();

    this.selectAddress(null);

  }

  continueToPayment() {
    if (!this.selectedAddress) return;
    localStorage.setItem('selectedAddress', JSON.stringify(this.selectedAddress));
    this.router.navigate(['/cart/checkout/payment']);
  }

  selectAddress(address: any) {
    this.selectedAddress = address;
    this.CartService.setAddress(address); 
  }

}
