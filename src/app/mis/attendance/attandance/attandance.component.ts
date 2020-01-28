import { Component, OnInit } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { attendanceLinks } from '../links';

@Component({
  selector: 'app-attandance',
  templateUrl: './attandance.component.html',
  styleUrls: ['./attandance.component.scss']
})
export class AttandanceComponent implements OnInit {

  links: TabLink[] = attendanceLinks();

  constructor() { }

  ngOnInit() {
  }

  onPresent(args) {
    
  }

}
