import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorize]'
})
export class ColorizeDirective {

  constructor(private el: ElementRef) { 
    const element = this.el.nativeElement as HTMLElement;
    const red = Math.random() * 200;
    const green = Math.random() * 210;
    const blue = Math.random() * 220;
    element.style.color = `rgb(${red}, ${green}, ${blue})`;
  }

}
