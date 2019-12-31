import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students/students.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentsImportComponent } from './students-import/students-import.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentsService } from './students.service';
import { StudentPrintingComponent } from './student-printing/student-printing.component';
import { StudentOutComponent } from './student-out/student-out.component';
import { StudentsMarkableComponent } from './students-markable/students-markable.component';
import { ToastrService } from 'src/app/toastr.service';
import { Http } from 'src/app/http/http';
import { AuthService } from 'src/app/auth.service';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { StudentDetailsComponent } from './student-details/student-details.component';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormComponent,
    StudentsImportComponent,
    StudentListComponent,
    StudentPrintingComponent,
    StudentOutComponent,
    StudentsMarkableComponent,
    StudentDetailsComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    CustomElementsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTabsModule
  ],
  entryComponents: [
    StudentDetailsComponent
  ],
  exports: [
    StudentsComponent
  ],
  providers: [
    StudentsService,
    ToastrService,
    Http,
    AuthService
  ]
})
export class StudentsModule { }
