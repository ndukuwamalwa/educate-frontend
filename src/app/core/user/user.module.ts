import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { PortalModule } from '../portal/portal.module';
import { UserComponent } from './user/user.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { UserService } from './user.service';
import { PaginationModule } from '../pagination/pagination.module';
import { UserPageComponent } from './user-page/user-page.component';
import { LoaderModule } from 'src/app/loader/loader.module';
import { Http } from 'src/app/http/http';

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
    PaginationModule,
    LoaderModule
  ],
  exports: [
    UserComponent
  ],
  providers: [
    UserService,
    Http
  ]
})
export class UserModule { }
