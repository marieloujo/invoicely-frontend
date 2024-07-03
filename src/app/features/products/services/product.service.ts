import { Injectable } from '@angular/core';
import { ApiListResponse, ApiResponse } from '@app/core/types/api-response.type';
import { Product } from '@app/shared/models/product.model';
import { HttpClientService } from '@app/shared/services/http-client.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseEndpoint = environment.PRODUCT_ROUTE;

  constructor(private httpClientService: HttpClientService) { }

  getProducts(page: number): Observable<ApiListResponse<Product>> {
    const url = `${this.baseEndpoint}?page=${page}`;
    return this.httpClientService.get<ApiListResponse<Product>>(url);
  }

  addProduct(product: Product): Observable<ApiResponse<Product>> {
    const url = `${this.baseEndpoint}`;
    return this.httpClientService.post<ApiResponse<Product>>(url, product);
  }

  updateProduct(product: Product): Observable<ApiResponse<Product>> {
    return this.httpClientService.put<ApiResponse<Product>>(`${this.baseEndpoint}/${product.id}`, product);
  }

  deleteProduct(productId: string): Observable<void> {
    const url = `${this.baseEndpoint}/${productId}`;
    return this.httpClientService.delete<void>(url);
  }

  closeForm() {
    document.getElementById('dismiss-modal')?.click()
  }

}
