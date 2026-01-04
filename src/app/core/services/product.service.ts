import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sellerProduct } from '../models/seller';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://angular-ecommerce-6c682-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  // 🔹 ADD PRODUCT
  addProduct(product: sellerProduct) {
    return this.http.post(
      `${this.baseUrl}/products.json`,
      product
    );
  }

  // 🔹 GET PRODUCTS (BY SELLER)
  getProducts(sellerId: string) {
    return this.http.get<{ [key: string]: sellerProduct }>(
      `${this.baseUrl}/products.json`
    ).pipe(
      map(res => { 
        const products: sellerProduct[] = [];
        for (let key in res) {
          if (res[key].sellerId === sellerId) {
            products.push({ ...res[key], id: key }); 
          }
        }
        return products;
      })
    );
  }

  // 🔹 UPDATE PRODUCT
  updateProduct(id: string, product: sellerProduct) {
    return this.http.put(
      `${this.baseUrl}/products/${id}.json`,
      product
    );
  }

  // 🔹 DELETE PRODUCT
  deleteProduct(id: string) {

    console.log("Selller ID",id)
    return this.http.delete(
      `${this.baseUrl}/products/${id}.json`
    );
  }
 
}
