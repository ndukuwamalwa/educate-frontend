import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers/teachers.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { AssignClassComponent } from './assign-class/assign-class.component';
import { ViewClassTeachersComponent } from './view-class-teachers/view-class-teachers.component';
import { AssignSubjectComponent } from './assign-subject/assign-subject.component';
import { ViewTeacherSubjectsComponent } from './view-teacher-subjects/view-teacher-subjects.component';
import { TeacherService } from './teacher.service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    TeachersComponent, 
    TeacherListComponent, 
    AssignClassComponent, 
    ViewClassTeachersComponent, 
    AssignSubjectComponent, 
    ViewTeacherSubjectsComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    CustomElementsModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    TeachersComponent
  ],
  providers: [
    TeacherService
  ]
})
export class TeachersModule { }
