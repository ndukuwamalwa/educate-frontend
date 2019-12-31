import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal/portal.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';



@NgModule({
  declarations: [PortalComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [PortalComponent],
  providers: [
    AuthService
  ]
})
export class PortalModule { }
