import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private _token: string | null = null;

  setToken(token: string): void {
    this._token = token;
  }

  getToken(): string | null {
    return this._token;
  }

  clearToken(): void {
    this._token = null;
  }

}
