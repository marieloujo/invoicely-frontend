import { Injectable } from '@angular/core';
import { HttpClientService } from '@shared/services/http-client.service';
import { environment } from '@environments/environment';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../types/login-request';
import { BearerToken } from '@shared/models/bearer-token.model';
import { TokenService } from '@app/shared/services/token.service';
import { LoginData } from '../types/login-response';
import { RegisterRequest } from '../types/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseEndpoint = environment.AUTH_ROUTE;

  constructor(private httpClientService: HttpClientService,
    private tokenService: TokenService) { }

  login(body: LoginRequest): Observable<any> {
    return this.httpClientService.post(`${this.baseEndpoint}/login`, body)
  }

  register(body: RegisterRequest): Observable<any> {
    return this.httpClientService.post(`${this.baseEndpoint}/register`, body);
  }

  logout(): Observable<any> {
    return this.httpClientService.post(`${this.baseEndpoint}/logout`, {});
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  saveTokenAndUser(data: LoginData): void {
    this.tokenService.storeToken(data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user))
  }

}
