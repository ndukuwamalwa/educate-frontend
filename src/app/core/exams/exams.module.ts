import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam/exam.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ExamService } from './exam.service';
import { ToastrService } from 'src/app/toastr.service';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/loader/loader.module';
import { PaginationModule } from '../pagination/pagination.module';
import { ExamPageComponent } from './exam-page/exam-page.component';
import { SubjectService } from '../subject/subject.service';
import { BatchService } from '../batch/batch.service';

@NgModule({
  declarations: [
    ExamComponent,
    ExamPageComponent
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
    ExamComponent,
    ExamPageComponent
  ],
  providers: [
    ExamService,
    ToastrService,
    SubjectService,
    BatchService
  ]
})
export class ExamsModule { }
