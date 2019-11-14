import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NormalPaginationComponent } from './normal-pagination/normal-pagination.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NormalPaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NormalPaginationComponent
  ]
})
export class PaginationModule { }
