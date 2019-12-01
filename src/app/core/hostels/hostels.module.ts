import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostelsComponent } from './hostels/hostels.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { HostelsService } from './hostels.service';
import { LoaderModule } from 'src/app/loader/loader.module';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'src/app/toastr.service';
import { Http } from 'src/app/http/http';

@NgModule({
  declarations: [HostelsComponent],
  imports: [
    CommonModule,
    PortalModule,
    DirectivesModule,
    DashboardModule,
    LoaderModule,
    FormsModule
  ],
  exports: [
    HostelsComponent
  ],
  providers: [
    HostelsService,
    ToastrService,
    Http
  ]
})
export class HostelsModule { }
