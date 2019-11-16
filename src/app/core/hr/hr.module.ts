import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrComponent } from './hr/hr.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { HrService } from './hr.service';
import { ToastrService } from 'src/app/toastr.service';
import { HrPageComponent } from './hr-page/hr-page.component';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/loader/loader.module';
import { PaginationModule } from '../pagination/pagination.module';
import { Http } from 'src/app/http/http';

@NgModule({
  declarations: [
    HrComponent,
    HrPageComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    DirectivesModule,
    DashboardModule,
    FormsModule,
    LoaderModule,
    PaginationModule
  ],
  exports: [
    HrComponent
  ],
  providers: [
    HrService,
    ToastrService,
    Http
  ]
})
export class HrModule { }
