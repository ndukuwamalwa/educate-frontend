import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup/setup.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { AddTermComponent } from './add-term/add-term.component';
import { ViewTermsComponent } from './view-terms/view-terms.component';
import { SetupService } from './setup.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TermDetailsComponent } from './term-details/term-details.component';
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [
    SetupComponent, 
    AddTermComponent, 
    ViewTermsComponent, TermDetailsComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    CustomElementsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule
  ],
  exports: [
    SetupComponent
  ],
  entryComponents: [
    TermDetailsComponent
  ]
  ,
  providers: [
    SetupService
  ]
})
export class SetupModule { }
