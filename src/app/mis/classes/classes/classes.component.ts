import { Component, OnInit } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { classLinks } from '../links';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  links: TabLink[] = classLinks();

  constructor() { }

  ngOnInit() {
  }

}
