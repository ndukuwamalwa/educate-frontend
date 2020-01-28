import { Component, OnInit } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { feeLinks } from '../links';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {

  links: TabLink[] = feeLinks();

  constructor() { }

  ngOnInit() {
  }

}
