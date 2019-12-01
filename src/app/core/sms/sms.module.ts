import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsComponent } from './sms/sms.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/loader/loader.module';
import { ToastrService } from 'src/app/toastr.service';
import { SmsService } from './sms.service';
import { ClassService } from '../class/class.service';
import { PaginationModule } from '../pagination/pagination.module';
import { Http } from 'src/app/http/http';

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
    ClassService,
    Http
  ]
})
export class SmsModule { }
