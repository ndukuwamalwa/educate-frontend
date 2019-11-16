import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  user;

  constructor() { }

  ngOnInit() {
    this.user = this.jwtHelper.decodeToken(window.sessionStorage.getItem('token'));
  }

  toggleModules() {
    const modulePane = document.getElementById('module-pane');
    if (modulePane.style.display === 'none') {
      modulePane.style.display = 'flex';
    } else {
      modulePane.style.display = 'none';
    }
  }

}
