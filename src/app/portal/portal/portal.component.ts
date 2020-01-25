import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  menuShown: boolean = false;
  user: any;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    const desktopWidth = 1050;
    const width = window.innerWidth;
    if (width > desktopWidth) {
      this.menuShown = true;
    }
    window.addEventListener("resize", e => {
      const w = (e.target as any).innerWidth;
      if (w > desktopWidth && this.menuShown === false) {
        this.menuShown = true;
      } else {
        if (!this.menuShown) {
          this.menuShown = false;
        }
      }
    });
    this.user = this.auth.getUserDetails();
  }

  toggleMenu() {
    this.menuShown = !this.menuShown;
  }

  logout() {
    this.auth.logout()
    .then(o => {
      this.router.navigate(['']);
    });
  }

  isActiveMenu(path: string) {
    return window.location.pathname.startsWith(path);
  }
}
