import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsComponent } from './subjects/subjects.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { ViewSubjectsComponent } from './view-subjects/view-subjects.component';
import { SubjectRegisterComponent } from './subject-register/subject-register.component';
import { ViewSubjectRegisterComponent } from './view-subject-register/view-subject-register.component';
import { SubjectService } from './subject.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    SubjectsComponent,
    AddSubjectComponent,
    ViewSubjectsComponent,
    SubjectRegisterComponent,
    ViewSubjectRegisterComponent,
    SubjectDetailsComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    CustomElementsModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule
  ],
  exports: [
    SubjectsComponent
  ],
  providers: [
    SubjectService
  ],
  entryComponents: [
    SubjectDetailsComponent
  ]
})
export class SubjectsModule { }
