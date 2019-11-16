import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  jwtHelper = new JwtHelperService();

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = window.sessionStorage.getItem('token');
    if (!token) {
      return true;
    }
    const isExpired = this.jwtHelper.isTokenExpired(token);
    if (isExpired) {
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('userInfo');
      return true;
    }
    return false;
  }
}
