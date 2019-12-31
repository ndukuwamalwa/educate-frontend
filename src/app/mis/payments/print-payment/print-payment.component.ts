import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-print-payment',
  templateUrl: './print-payment.component.html',
  styleUrls: ['./print-payment.component.scss']
})
export class PrintPaymentComponent implements OnInit {
  @Input('type') type: string;
  url: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  viewPayments(startDate: string, endDate: string) {
    const base = `${environment.apiUrl}/api/payments/`;
    const url = `${base}${this.type}/print?startDate=${startDate}&endDate=${endDate}&token=${this.auth.token}`;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
