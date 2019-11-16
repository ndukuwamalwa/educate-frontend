import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './subject/subject.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { SubjectService } from './subject.service';
import { ToastrService } from 'src/app/toastr.service';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/loader/loader.module';
import { Http } from 'src/app/http/http';

@NgModule({
  declarations: [SubjectComponent],
  imports: [
    CommonModule,
    PortalModule,
    DirectivesModule,
    DashboardModule,
    FormsModule,
    LoaderModule
  ],
  providers: [
    SubjectService,
    ToastrService,
    Http
  ]
})
export class SubjectModule { }
