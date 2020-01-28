import { Component, OnInit } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { smsLinks } from '../links';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {

  links: TabLink[] = smsLinks();

  constructor() { }

  ngOnInit() {
  }

}
