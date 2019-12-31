import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-print-cheque-payment',
  templateUrl: './print-cheque-payment.component.html',
  styleUrls: ['./print-cheque-payment.component.scss']
})
export class PrintChequePaymentComponent implements OnInit {
  url: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  print(data) {
    let url = `${environment.apiUrl}/api`;
    if (data.cat === "cheques") {
      url = `${url}/payments/cheque/print?startDate=${data.startDate}&endDate=${data.endDate}&token=${this.auth.token}`;
    } else {
      url = `${url}/payments/cheque/beneficiaries/print?no=${data.no}&token=${this.auth.token}`;
    }
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
