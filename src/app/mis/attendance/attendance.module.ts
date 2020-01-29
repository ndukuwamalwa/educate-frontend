import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttandanceComponent } from './attandance/attandance.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { AbsentStudentsComponent } from './absent-students/absent-students.component';
import { FormsModule } from '@angular/forms';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { AttendanceService } from './attendance.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CacheService } from 'src/app/cache-service';



@NgModule({
  declarations: [AttandanceComponent, AbsentStudentsComponent, ViewAttendanceComponent],
  imports: [
    CommonModule,
    PortalModule,
    CustomElementsModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    AttandanceComponent
  ],
  providers: [
    AttendanceService,
    CacheService
  ]
})
export class AttendanceModule { }
