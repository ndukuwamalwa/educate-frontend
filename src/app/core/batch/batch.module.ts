import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchComponent } from './batch/batch.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { BatchService } from './batch.service';
import { BatchPageComponent } from './batch-page/batch-page.component';
import { InstituteService } from '../institute/institute.service';
import { ToastrService } from 'src/app/toastr.service';
import { LoaderModule } from 'src/app/loader/loader.module';
import { PaginationModule } from '../pagination/pagination.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BatchComponent,
    BatchPageComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    DirectivesModule,
    DashboardModule,
    LoaderModule,
    PaginationModule,
    FormsModule
  ],
  exports: [
    BatchComponent
  ],
  providers: [
    BatchService,
    InstituteService,
    ToastrService
  ]
})
export class BatchModule { }
