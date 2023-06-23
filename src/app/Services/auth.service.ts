import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../config';

const AUTH_API = `${config.backendUrl}/api/auth/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string, rememberMe:any ): Observable<any> {
    return this.http.post(AUTH_API + 'login', { email, password ,rememberMe }, {
      ...httpOptions,
      observe: 'response'
    });
  }

  register(name: string, email: string, phone:string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      name,
      email,
      phone,
      password
    },{
    ...httpOptions,
    observe: 'response'});
  }

  loginWithGoogle(): Observable<any> {

    return this.http.get(AUTH_API + 'google', {
      ...httpOptions,
      observe: 'response',
      withCredentials: true
    });
  }

  loginWithFacebook(): Observable<any> {
    return this.http.get(AUTH_API + 'facebook', {
      ...httpOptions,
      observe: 'response'
    });
  }

  logout(id : any){
    return this.http.post(AUTH_API + 'logout', {id},{
      ...httpOptions,
      observe: 'response'
    });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'register/forgot-password', { email}, {
      ...httpOptions,
      observe: 'response'
    });
  }

  resetPassword(password: any, token: any): Observable<any> {
    return this.http.post(AUTH_API + 'register/reset-password', { password , token }, {
      ...httpOptions,
      observe: 'response'
    });
  }

}
