import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements AfterViewInit, OnInit {
  @Input('links') links: TabLink[];
  @Input('default') default: string;
  @Input('base') base: string;
  tab: string;
  subtab: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (this.links.find(l => l.path.toLowerCase() === `/${params.tab.toLowerCase()}`)) {
        this.tab = params.tab;
      } else {
        this.tab = this.default.replace("/", "");
      }
      const link = this.links.find(l => l.path.toLowerCase() === `/${this.tab.toLowerCase()}`);
      if (link.children.find(c => c.path.toLowerCase() === `/${params.subtab.toLowerCase()}`)) {
        this.subtab = params.subtab;
      } else {
        this.subtab = link.default.replace("/", "");
      }
      this.changeView();
    });
  }

  ngAfterViewInit(): void {
    this.changeView();
  }

  changeView() {
    const mainLinks = document.querySelectorAll("#top-nav > a");
    mainLinks.forEach(a => {
      a = (a as HTMLElement);
      let href = a.getAttribute("href").toLowerCase().split('/').filter(s => s.trim().length > 0);
      if (href[1] === this.tab.toLowerCase()) {
        a.classList.add("active-tab");
      } else {
        a.classList.remove("active-tab");
      }
    });
    const sublinks = document.querySelectorAll("#view > .left-sub-menu");
    sublinks.forEach(sl => {
      let path = sl.getAttribute("data-path").toLowerCase();
      if (path === `/${this.tab.toLowerCase()}`) {
        (sl as HTMLElement).style.display = "flex";
      } else {
        (sl as HTMLElement).style.display = "none";
      }
    });
    const contents = document.querySelectorAll("#content > div");
    contents.forEach(c => {
      let el = (c as HTMLElement);
      if (el.getAttribute("data-path").toLocaleLowerCase() === `/${this.tab.toLowerCase()}`) {
        el.classList.remove("hide");
        el.childNodes.forEach(ch => {
          let sub = (ch as HTMLElement);
          if (sub.nodeName.startsWith("#")) return;
          if (sub.getAttribute("data-path").toLocaleLowerCase() === `/${this.subtab.toLowerCase()}`) {
            sub.classList.remove("hide");
          } else {
            sub.classList.add("hide");
          }
        });
      } else {
        el.classList.add("hide");
      }
    });
  }

}
