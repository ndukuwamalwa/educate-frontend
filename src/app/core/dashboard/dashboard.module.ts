import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDashComponent } from './student-dash/student-dash.component';
import { AttendanceDashComponent } from './attendance-dash/attendance-dash.component';
import { BatchDashComponent } from './batch-dash/batch-dash.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { SubjectDashComponent } from './subject-dash/subject-dash.component';
import { ExamDashComponent } from './exam-dash/exam-dash.component';
import { FeeDashComponent } from './fee-dash/fee-dash.component';
import { EmployeeDashComponent } from './employee-dash/employee-dash.component';
import { HostelDashComponent } from './hostel-dash/hostel-dash.component';
import { DashboardService } from './dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { LoaderModule } from 'src/app/loader/loader.module';
import { ToastrService } from 'src/app/toastr.service';

@NgModule({
  declarations: [
    StudentDashComponent, 
    AttendanceDashComponent, 
    BatchDashComponent, 
    UserDashComponent, 
    SubjectDashComponent, 
    ExamDashComponent, 
    FeeDashComponent, 
    EmployeeDashComponent, 
    HostelDashComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    LoaderModule
  ],
  exports: [
    StudentDashComponent, 
    AttendanceDashComponent, 
    BatchDashComponent, 
    UserDashComponent, 
    SubjectDashComponent, 
    ExamDashComponent, 
    FeeDashComponent, 
    EmployeeDashComponent, 
    HostelDashComponent,
    HttpClientModule
  ],
  providers: [
    DashboardService,
    ToastrService
  ]
})
export class DashboardModule { }
