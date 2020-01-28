import { Component, OnInit } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { examLinks } from '../links';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {

  links: TabLink[] = examLinks();

  constructor() { }

  ngOnInit() {
  }

}
