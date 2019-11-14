import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewDirective } from './tab-view.directive';
import { ColorizeDirective } from './colorize.directive';

@NgModule({
  declarations: [
    TabViewDirective,
    ColorizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabViewDirective,
    ColorizeDirective
  ]
})
export class DirectivesModule { }
