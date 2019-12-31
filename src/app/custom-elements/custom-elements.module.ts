import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TabComponent } from './tab/tab.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    TableComponent,
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
    TableComponent,
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
