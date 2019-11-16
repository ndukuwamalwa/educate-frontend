import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student/student.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';
import { StudentService } from './student.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentPageComponent } from './student-page/student-page.component';
import { PaginationModule } from '../pagination/pagination.module';
import { BatchService } from '../batch/batch.service';
import { SubjectService } from '../subject/subject.service';
import { ExamService } from '../exams/exam.service';
import { FinanceService } from '../finance/finance.service';
import { InstituteService } from '../institute/institute.service';
import { ToastrService } from 'src/app/toastr.service';
import { LoaderModule } from 'src/app/loader/loader.module';
import { Http } from 'src/app/http/http';

@NgModule({
  declarations: [StudentComponent, StudentPageComponent],
  imports: [
    CommonModule,
    PortalModule,
    DirectivesModule,
    DashboardModule,
    FormsModule,
    HttpClientModule,
    PaginationModule,
    LoaderModule
  ],
  exports: [
    StudentComponent,
    StudentPageComponent
  ],
  providers: [
    StudentService,
    BatchService,
    SubjectService,
    ExamService,
    FinanceService,
    InstituteService,
    ToastrService,
    Http
  ]
})
export class StudentModule { }
