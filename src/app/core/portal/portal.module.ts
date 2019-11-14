import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal/portal.component';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/routes';

@NgModule({
  declarations: [
    PortalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    PortalComponent
  ]
})
export class PortalModule { }