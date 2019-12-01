import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from './class/class.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ClassService } from './class.service';
import { ClassPageComponent } from './class-page/class-page.component';
import { ToastrService } from 'src/app/toastr.service';
import { LoaderModule } from 'src/app/loader/loader.module';
import { PaginationModule } from '../pagination/pagination.module';
import { FormsModule } from '@angular/forms';
import { Http } from 'src/app/http/http';
import { RouterModule } from '@angular/router';
import { StreamPageComponent } from './stream-page/stream-page.component';

@NgModule({
  declarations: [
    ClassComponent,
    ClassPageComponent,
    StreamPageComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    DirectivesModule,
    DashboardModule,
    LoaderModule,
    PaginationModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ClassComponent
  ],
  providers: [
    ClassService,
    ToastrService,
    Http
  ]
})
export class BatchModule { }
