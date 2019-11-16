import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstituteComponent } from './institute/institute.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { InstituteService } from './institute.service';
import { LoaderModule } from 'src/app/loader/loader.module';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'src/app/toastr.service';
import { Http } from 'src/app/http/http';

@NgModule({
  declarations: [InstituteComponent],
  imports: [
    CommonModule,
    PortalModule,
    DirectivesModule,
    DashboardModule,
    LoaderModule,
    FormsModule
  ],
  exports: [
    InstituteComponent
  ],
  providers: [
    InstituteService,
    ToastrService,
    Http
  ]
})
export class InstituteModule { }
