import { Component, OnInit } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { teacherLinks } from '../links';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  links: TabLink[] = teacherLinks;

  constructor() { }

  ngOnInit() {
  }

}
