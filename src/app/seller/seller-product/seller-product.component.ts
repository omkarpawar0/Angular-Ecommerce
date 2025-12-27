import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrls: ['./seller-product.component.scss']
})
export class SellerProductComponent {
  tableFilter: string = '';
  countries: any[] = [];

  selectedCountry: { name: string; code: string } | null = null;


  ngOnInit() {
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];
  }

  // 
  // products!: any[];

  products = [
    { code: 'P1001', name: 'Margherita Pizza', category: 'Pizza', price: 50000, dietary: 15, variations: 15, addons: 15 },
    { code: 'P1002', name: 'Farmhouse Pizza', category: 'Pizza', price: 50000, dietary: 30, variations: 30, addons: 30 },
    { code: 'P1003', name: 'Peppy Paneer', category: 'Pizza', price: 50000, dietary: 50, variations: 50, addons: 50 },
    { code: 'P1004', name: 'Cheese Burst', category: 'Pizza', price: 50000, dietary: 20, variations: 20, addons: 20 },
    { code: 'P1005', name: 'Mexican Green Wave', category: 'Pizza', price: 50000, dietary: 25, variations: 25, addons: 25 },
    { code: 'P1006', name: 'Veg Extravaganza', category: 'Pizza', price: 50000, dietary: 10, variations: 10, addons: 10 },
    { code: 'P1007', name: 'Paneer Makhani', category: 'Pizza', price: 50000, dietary: 18, variations: 18, addons: 18 },
    { code: 'P1008', name: 'Tandoori Paneer', category: 'Pizza', price: 50000, dietary: 12, variations: 12, addons: 12 },
    { code: 'P1009', name: 'Deluxe Veggie', category: 'Pizza', price: 50000, dietary: 5, variations: 5, addons: 5 },
    { code: 'P1010', name: 'Classic Hand Tossed', category: 'Pizza', price: 50000, dietary: 100, variations: 100, addons: 100 }
  ];



  clearFilter() {
    this.tableFilter = '';
  }
}
