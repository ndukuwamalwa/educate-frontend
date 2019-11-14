import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { PortalModule } from '../portal/portal.module';
import { UserComponent } from './user/user.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { HttpResponseModule } from '../http-response/http-response.module';
import { UserService } from './user.service';
import { PaginationModule } from '../pagination/pagination.module';
import { UserPageComponent } from './user-page/user-page.component';
import { LoaderModule } from 'src/app/loader/loader.module';

@NgModule({
  declarations: [
    UserComponent,
    UserPageComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    DirectivesModule,
    DashboardModule,
    FormsModule,
    HttpResponseModule,
    PaginationModule,
    LoaderModule
  ],
  exports: [
    UserComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
