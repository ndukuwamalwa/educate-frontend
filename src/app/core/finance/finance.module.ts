import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceComponent } from './finance/finance.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FinanceService } from './finance.service';
import { PaginationModule } from '../pagination/pagination.module';
import { LoaderModule } from 'src/app/loader/loader.module';
import { ToastrService } from 'src/app/toastr.service';
import { FormsModule } from '@angular/forms';
import { ClassService } from '../class/class.service';
import { Http } from 'src/app/http/http';

@NgModule({
  declarations: [
    FinanceComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    DirectivesModule,
    DashboardModule,
    PaginationModule,
    LoaderModule,
    FormsModule
  ],
  exports: [
    FinanceComponent
  ],
  providers: [
    FinanceService,
    ToastrService,
    ClassService,
    Http
  ]
})
export class FinanceModule { }
