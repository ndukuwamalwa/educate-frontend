import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { DashboardService } from './dashboard.service';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    PortalModule,
    CustomElementsModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
