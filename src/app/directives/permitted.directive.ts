import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Directive({
  selector: '[appPermitted]'
})
export class PermittedDirective implements OnInit {
  @Input('table') table: string;
  @Input('operation') operation: string;
  jwtHelper = new JwtHelperService();

  constructor(private elem: ElementRef, private router: Router) { }

  ngOnInit() {
    this.decideVisibility();
  }

  decideVisibility() {
    const token = window.sessionStorage.getItem('token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['']);
      return;
    }
    const decoded = this.jwtHelper.decodeToken(token);
    if (!decoded.modules) {
      this.router.navigate(['']);
      return;
    }
    const modules = decoded.modules;
    if (modules.length === 0) {
      this.hideItem();
      return;
    }
    if (modules[0].document.toLowerCase() === 'all') return;    //Super admin
    const accessible = modules.find(perm => {
      const table = this.table.toLowerCase();
      const operation = this.operation.toLowerCase();
      const permTable = perm.document.toLowerCase();
      const permOperation = perm.operation.toLowerCase();
      return (table === permTable) && (operation === permOperation);
    });
    if (!accessible) {
      this.hideItem();
    };
  }

  hideItem() {
    (this.elem.nativeElement as HTMLElement).style.display = 'none';
  }

}
