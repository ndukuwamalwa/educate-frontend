import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes/classes.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { AddClassComponent } from './add-class/add-class.component';
import { ViewClassesComponent } from './view-classes/view-classes.component';
import { ViewStreamsComponent } from './view-streams/view-streams.component';
import { ClassStudentsComponent } from './class-students/class-students.component';
import { StreamStudentsComponent } from './stream-students/stream-students.component';
import { UnclassedStudentsComponent } from './unclassed-students/unclassed-students.component';
import { ClassPrintingComponent } from './class-printing/class-printing.component';
import { StreamPrintingComponent } from './stream-printing/stream-printing.component';
import { ClassService } from './class.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StreamDetailsComponent } from './stream-details/stream-details.component';
import { AddStreamComponent } from './add-stream/add-stream.component';
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [
    ClassesComponent,
    AddClassComponent,
    ViewClassesComponent,
    ViewStreamsComponent,
    ClassStudentsComponent,
    StreamStudentsComponent,
    UnclassedStudentsComponent,
    ClassPrintingComponent,
    StreamPrintingComponent,
    ClassDetailsComponent,
    StreamDetailsComponent,
    AddStreamComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    CustomElementsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule
  ],
  exports: [
    ClassesComponent
  ],
  providers: [
    ClassService
  ],
  entryComponents: [
    ClassDetailsComponent,
    StreamDetailsComponent
  ]
})
export class ClassesModule { }
