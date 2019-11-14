import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher/teacher.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { TeacherService } from './teacher.service';
import { ToastrService } from 'src/app/toastr.service';
import { HrService } from '../hr/hr.service';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/loader/loader.module';
import { PaginationModule } from '../pagination/pagination.module';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';

@NgModule({
  declarations: [TeacherComponent, TeacherPageComponent],
  imports: [
    CommonModule,
    PortalModule,
    DirectivesModule,
    FormsModule,
    LoaderModule,
    PaginationModule
  ],
  exports: [
    TeacherComponent
  ],
  providers: [
    TeacherService,
    ToastrService,
    HrService
  ]
})
export class TeacherModule { }
