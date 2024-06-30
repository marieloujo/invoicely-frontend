import { Injectable } from '@angular/core';
import { ApiListResponse, ApiResponse } from '@app/core/types/api-response.type';
import { Client } from '@app/shared/models/client.model';
import { HttpClientService } from '@app/shared/services/http-client.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseEndpoint = environment.CLIENT_ROUTE;

  constructor(private httpClientService: HttpClientService) { }

  getClients(page: number): Observable<ApiListResponse<Client>> {
    const url = `${this.baseEndpoint}?page=${page}`;
    return this.httpClientService.get<ApiListResponse<Client>>(url);
  }

  addClient(newClient: Client): Observable<ApiResponse<Client>> {
    const url = `${this.baseEndpoint}`;
    return this.httpClientService.post<ApiResponse<Client>>(url, newClient);
  }

  updateClient(client: Client): Observable<ApiResponse<Client>> {
    return this.httpClientService.put<ApiResponse<Client>>(`${this.baseEndpoint}/${client.id}`, client);
  }

  deleteClient(clientId: string): Observable<void> {
    const url = `${this.baseEndpoint}/${clientId}`;
    return this.httpClientService.delete<void>(url);
  }

}
