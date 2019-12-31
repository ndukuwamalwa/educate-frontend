import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from '../payment.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-bankslip-detail',
  templateUrl: './bankslip-detail.component.html',
  styleUrls: ['./bankslip-detail.component.scss']
})
export class BankslipDetailComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private paymentService: PaymentService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  update(data) {
    this.isLoading = true;
    this.paymentService.updateBankslip(data, this.data.id)
      .subscribe(res => {
        this.isLoading = false;
        if (this.data.adm !== data.student) {
          this.paymentService.viewBankslip(this.data.id)
            .subscribe(res => {
              this.data = res;
            }, e => {});
        } else {
          this.data = { ...this.data, ...data };
        }
        this.toastr.success("Payment updated successfully.");
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Payment details matches another payment");
        return this.toastr.error("Failed to update payment");
      });
  }

}
