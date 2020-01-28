import { Component, OnInit } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { subjectLinks } from '../links';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  links: TabLink[] = subjectLinks();

  constructor() { }

  ngOnInit() {
  }

}
