import { Component, OnInit } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { userLinks } from '../links';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  links: TabLink[] = userLinks();

  constructor() { }

  ngOnInit() {
  }

}
