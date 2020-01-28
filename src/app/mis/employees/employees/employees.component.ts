import { Component, OnInit } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { employeeLinks } from '../links';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  links: TabLink[] = employeeLinks();

  constructor() { }

  ngOnInit() {
  }

}
