import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/types/api-response.type';
import { Statistic } from '@app/shared/models/statistic.model';
import { HttpClientService } from '@app/shared/services/http-client.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseEndpoint = environment.PRODUCT_ROUTE;

  constructor(private httpClientService: HttpClientService) { }

  getStatistic(): Observable<ApiResponse<Statistic>> {
    return this.httpClientService.get<ApiResponse<Statistic>>('statistics');
  }

}
