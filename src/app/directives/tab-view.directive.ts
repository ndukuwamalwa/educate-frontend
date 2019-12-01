import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTabView]'
})
export class TabViewDirective implements OnInit {

  constructor(private el: ElementRef) { }

  @HostListener('click') onClick() {
    const li = this.el.nativeElement as HTMLElement;
    const data = li.dataset['revealid'];
    const content = li.parentElement.nextElementSibling;
    const contentChildren = content.children;
    //Hide other tabs. This approach ensures that only the immediate element is styled; unlike using the class styling
    //which hides unintended elements
    for (let i = 0; i < contentChildren.length; i++) {
      (contentChildren[i] as HTMLElement).style.display = 'none';
    }
    //Remove styling on the clicked item and its siblings
    const siblings = li.parentElement.children;
    for (let i = 0; i < siblings.length; i++) {
      (siblings[i] as HTMLElement).classList.remove('tabs__links--active');
    }
    //Show the selected
    (document.querySelector(`.tabs__content > div[data-revealId=${data}]`) as HTMLElement).style.display = 'block';
    //Style clicked
    document.querySelector(`.tabs__links > li[data-revealId=${data}]`).classList.add('tabs__links--active');

  }

  ngOnInit() {
    this.changeView();
  }

  changeView() {
    const li = this.el.nativeElement as HTMLElement;
    //Show content if tab is default tab
    if (li.dataset['default'] && li.dataset['default'] === 'true') {
      const data = li.dataset['revealid'];
      li.classList.add('tabs__links--active');
      const div = document.querySelector(`.tabs__content > div[data-revealId=${data}]`);
      if (div) {
        (div as HTMLElement).style.display = 'block';
      }
    }
  }

}
