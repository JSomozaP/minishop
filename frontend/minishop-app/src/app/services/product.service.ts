import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Product, 
  ProductsResponse, 
  ProductResponse, 
  CheckoutResponse 
} from '../models/interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Routes publiques
  getAllProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/product/${id}`);
  }

  // Routes protégées
  createProduct(product: Partial<Product>): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/product`, product, { headers });
  }

  updateProduct(product: Product): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/product`, product, { headers });
  }

  deleteProduct(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/products/${id}`, { headers });
  }

  // Checkout Stripe
  checkout(productId: number, quantity: number = 1): Observable<CheckoutResponse> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<CheckoutResponse>(
      `${this.apiUrl}/checkout`, 
      { productId, quantity }, 
      { headers }
    );
  }
}
