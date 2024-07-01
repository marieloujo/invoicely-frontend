import { Injectable } from '@angular/core';
import { ApiListResponse, ApiResponse } from '@app/core/types/api-response.type';
import { Client } from '@app/shared/models/client.model';
import { Service } from '@app/shared/models/service.model';
import { HttpClientService } from '@app/shared/services/http-client.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseEndpoint = environment.SERVICE_ROUTE;

  constructor(private httpClientService: HttpClientService) { }

  getServices(page: number): Observable<ApiListResponse<Service>> {
    const url = `${this.baseEndpoint}?page=${page}`;
    return this.httpClientService.get<ApiListResponse<Service>>(url);
  }

  addService(service: Service): Observable<ApiResponse<Service>> {
    const url = `${this.baseEndpoint}`;
    return this.httpClientService.post<ApiResponse<Service>>(url, service);
  }

  updateService(service: Service): Observable<ApiResponse<Service>> {
    return this.httpClientService.put<ApiResponse<Service>>(`${this.baseEndpoint}/${service.id}`, service);
  }

  deleteService(serviceId: string): Observable<void> {
    const url = `${this.baseEndpoint}/${serviceId}`;
    return this.httpClientService.delete<void>(url);
  }

}
