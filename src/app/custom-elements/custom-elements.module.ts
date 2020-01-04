import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    TabComponent,
    PaginatorComponent,
    LoaderComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatDialogModule
  ],
  exports: [
    TabComponent,
    PaginatorComponent,
    LoaderComponent,
    ConfirmComponent
  ],
  entryComponents: [
    ConfirmComponent
  ]
})
export class CustomElementsModule { }
