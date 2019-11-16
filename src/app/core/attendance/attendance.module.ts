import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceCreateComponent } from './attendance-create/attendance-create.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { BatchService } from '../batch/batch.service';
import { AttendanceService } from './attendance.service';
import { ToastrService } from 'src/app/toastr.service';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/loader/loader.module';
import { Http } from 'src/app/http/http';

@NgModule({
  declarations: [
    AttendanceCreateComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    DirectivesModule,
    DashboardModule,
    FormsModule,
    LoaderModule
  ],
  exports: [
    AttendanceCreateComponent
  ],
  providers: [
    BatchService,
    AttendanceService,
    ToastrService,
    Http
  ]
})
export class AttendanceModule { }
