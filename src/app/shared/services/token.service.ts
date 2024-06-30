import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BearerToken } from '../models/bearer-token.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  storeToken(token: BearerToken): void {
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('refresh_token', token.refresh_token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  tokenExists(): boolean {
    return localStorage.getItem('access_token')  !== null;
  }

  deleteToken(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

}
