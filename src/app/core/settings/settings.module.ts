import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { PortalModule } from '../portal/portal.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/loader/loader.module';
import { UserService } from '../user/user.service';
import { ToastrService } from 'src/app/toastr.service';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    PortalModule,
    DirectivesModule,
    FormsModule,
    LoaderModule
  ],
  exports: [
    SettingsComponent
  ],
  providers: [
    UserService,
    ToastrService
  ]
})
export class SettingsModule { }
