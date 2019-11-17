import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  user;
  hideMenu: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = this.jwtHelper.decodeToken(window.sessionStorage.getItem('token'));
  }

  toggleModules(show: boolean) {
    const modulePane = document.getElementById('module-pane');
    if (show) {
      modulePane.style.display = 'flex';
      this.hideMenu = true;
    } else {
      modulePane.style.display = 'none';
      this.hideMenu = false;
    }
  }

  logout() {
    window.sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
