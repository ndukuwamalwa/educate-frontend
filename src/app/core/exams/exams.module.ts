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
import { ClassService } from '../class/class.service';
import { Http } from 'src/app/http/http';

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
    ClassService,
    Http
  ]
})
export class ExamsModule { }
