import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { LoaderModule } from 'src/app/loader/loader.module';
import { ToastrService } from 'src/app/toastr.service';
import { Http } from 'src/app/http/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortalModule } from '../portal/portal.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    LoaderModule,
    PortalModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    DashboardService,
    ToastrService,
    Http
  ]
})
export class DashboardModule { }
