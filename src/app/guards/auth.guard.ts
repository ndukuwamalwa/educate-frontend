import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;
  jwtHelper = new JwtHelperService();
  constructor(public router: Router) { }

  canActivate(requested: ActivatedRouteSnapshot, next: RouterStateSnapshot): boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      window.sessionStorage.setItem('next_url', next.url);
      this.router.navigateByUrl('');
      return false;
    }
  }

  isAuthenticated(): boolean {
    const token = window.sessionStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('');
      return false;
    }
    const isExpired = this.jwtHelper.isTokenExpired(token);
    if (isExpired) {
      window.sessionStorage.removeItem('token');
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }
}
