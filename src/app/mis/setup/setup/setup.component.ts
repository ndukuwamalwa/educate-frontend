import { Component, OnInit } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { setupLinks } from '../links';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  links: TabLink[] = setupLinks();

  constructor() { }

  ngOnInit() {
  }

}
