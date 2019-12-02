import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewDirective } from './tab-view.directive';
import { PermittedDirective } from './permitted.directive';

@NgModule({
  declarations: [
    TabViewDirective,
    PermittedDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabViewDirective,
    PermittedDirective
  ]
})
export class DirectivesModule { }
