import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeesComponent } from './fees/fees.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { ViewStudentFeeComponent } from './view-student-fee/view-student-fee.component';
import { ViewStreamFeeComponent } from './view-stream-fee/view-stream-fee.component';
import { ViewClassFeeComponent } from './view-class-fee/view-class-fee.component';
import { FeeService } from './fee.service';
import { FormsModule } from '@angular/forms';
import { FeePrintComponent } from './fee-print/fee-print.component';



@NgModule({
  declarations: [
    FeesComponent,
    ViewStudentFeeComponent,
    ViewStreamFeeComponent,
    ViewClassFeeComponent,
    FeePrintComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    CustomElementsModule,
    FormsModule
  ],
  exports: [
    FeesComponent
  ],
  providers: [
    FeeService
  ]
})
export class FeesModule { }
