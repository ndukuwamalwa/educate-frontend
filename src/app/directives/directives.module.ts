import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewDirective } from './tab-view.directive';
import { ColorizeDirective } from './colorize.directive';
import { PermittedDirective } from './permitted.directive';

@NgModule({
  declarations: [
    TabViewDirective,
    ColorizeDirective,
    PermittedDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabViewDirective,
    ColorizeDirective,
    PermittedDirective
  ]
})
export class DirectivesModule { }
