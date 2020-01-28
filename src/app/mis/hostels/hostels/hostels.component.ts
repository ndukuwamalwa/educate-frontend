import { Component, OnInit } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { hostelLinks } from '../links';

@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.scss']
})
export class HostelsComponent implements OnInit {

  links: TabLink[] = hostelLinks();

  constructor() { }

  ngOnInit() {
  }

}
