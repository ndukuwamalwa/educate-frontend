import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
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
      window.sessionStorage.setItem('afterLogin', next.url);
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
      window.sessionStorage.removeItem('userInfo');
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }
}
