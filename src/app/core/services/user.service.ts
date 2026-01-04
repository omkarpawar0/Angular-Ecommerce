import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://angular-ecommerce-6c682-default-rtdb.firebaseio.com';

  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();


  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http
      .get<{ [key: string]: any }>(
        `${this.baseUrl}/products.json`
      )
      .pipe(
        map(res => {
          if (!res) return [];
          return Object.keys(res).map(id => ({

            id,
            ...res[id]
          }));
        })
      );
  }





  search(term: string) {
    this.searchTermSubject.next(term);
  }

}
