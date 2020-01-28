import { Component, OnInit } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { paymentLinks } from '../links';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  links: TabLink[] = paymentLinks();

  constructor() { }

  ngOnInit() {
  }

}
