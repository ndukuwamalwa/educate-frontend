import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenService = new JwtHelperService();

  url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { username, password });
  }

  changePassword(password: string, userId: number): Observable<any> {
    return this.http.post(`${this.url}/change-password?id=${userId}`, { password });
  }

  setToken(token: string): Promise<boolean> {
    const set = window.sessionStorage.setItem("token", token);
    //Be sure not to leave without setting;
    if (!window.sessionStorage.getItem("token")) {
      return this.setToken(token);
    }
    return Promise.resolve(true);
  }

  getUserDetails(): { name: string, username: string, title: string, access: string } {
    const token = window.sessionStorage.getItem("token");
    if (!token) return null;
    const user = this.tokenService.decodeToken(token);
    return user;
  }

  logout(): Promise<boolean> {
    window.sessionStorage.removeItem("token");
    return Promise.resolve(true);
  }

  get token () {
    return window.sessionStorage.getItem('token');
  }

  isTokenExpired(): boolean {
    return this.tokenService.isTokenExpired(this.token);
  }

}
