import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostelsComponent } from './hostels/hostels.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { AddHostelComponent } from './add-hostel/add-hostel.component';
import { ViewHostelsComponent } from './view-hostels/view-hostels.component';
import { AddHostelStudentsComponent } from './add-hostel-students/add-hostel-students.component';
import { ViewHostelStudentsComponent } from './view-hostel-students/view-hostel-students.component';
import { PrintHostelStudentsComponent } from './print-hostel-students/print-hostel-students.component';
import { HostelService } from './hostel.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostelDetailsComponent } from './hostel-details/hostel-details.component';



@NgModule({
  declarations: [
    HostelsComponent, 
    AddHostelComponent, 
    ViewHostelsComponent, 
    AddHostelStudentsComponent, 
    ViewHostelStudentsComponent, 
    PrintHostelStudentsComponent, 
    HostelDetailsComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    CustomElementsModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HostelsComponent
  ],
  providers: [
    HostelService
  ],
  entryComponents: [
    HostelDetailsComponent
  ]
})
export class HostelsModule { }
