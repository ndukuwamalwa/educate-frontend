import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpResponseComponent } from './http-response/http-response.component';

@NgModule({
  declarations: [
    HttpResponseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HttpResponseComponent
  ]
})
export class HttpResponseModule { }
