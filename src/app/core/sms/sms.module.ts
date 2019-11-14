import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsComponent } from './sms/sms.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/loader/loader.module';
import { ToastrService } from 'src/app/toastr.service';
import { SmsService } from './sms.service';
import { BatchService } from '../batch/batch.service';
import { PaginationModule } from '../pagination/pagination.module';

@NgModule({
  declarations: [SmsComponent],
  imports: [
    CommonModule,
    PortalModule,
    DirectivesModule,
    FormsModule,
    LoaderModule,
    PaginationModule
  ],
  exports: [
    SmsComponent
  ],
  providers: [
    ToastrService,
    SmsService,
    BatchService
  ]
})
export class SmsModule { }
