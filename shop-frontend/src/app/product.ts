import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, PagedResult, ProductFilter } from './models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5249/api/products';

  constructor(private http: HttpClient) {}

  getAll(page: number = 1, pageSize: number = 10, filter: ProductFilter = {}): Observable<PagedResult<Product>> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);

    if (filter.searchTerm) {
      params = params.set('searchTerm', filter.searchTerm);
    }
    if (filter.minPrice != null) {
      params = params.set('minPrice', filter.minPrice);
    }
    if (filter.maxPrice != null) {
      params = params.set('maxPrice', filter.maxPrice);
    }

    return this.http.get<PagedResult<Product>>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(id: number, product: Omit<Product, 'id'>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
