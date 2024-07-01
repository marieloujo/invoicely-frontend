import { Injectable } from '@angular/core';
import { ApiListResponse, ApiResponse } from '@app/core/types/api-response.type';
import { Invoice } from '@app/shared/models/invoice.model';
import { HttpClientService } from '@app/shared/services/http-client.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseEndpoint = environment.INVOICE_ROUTE;

  constructor(private httpClientService: HttpClientService) { }

  getInvoices(page: number): Observable<ApiListResponse<Invoice>> {
    const url = `${this.baseEndpoint}?page=${page}`;
    return this.httpClientService.get<ApiListResponse<Invoice>>(url);
  }

  createInvoice(invoice: Invoice): Observable<ApiResponse<Invoice>> {
    return this.httpClientService.post<ApiResponse<Invoice>>(`${this.baseEndpoint}`, invoice);
  }

  getInvoiceById(id: string): Observable<ApiResponse<Invoice>> {
    return this.httpClientService.get<ApiResponse<Invoice>>(`${this.baseEndpoint}/${id}`);
  }

}
