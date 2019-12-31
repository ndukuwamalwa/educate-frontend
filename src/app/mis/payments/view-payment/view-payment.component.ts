import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subscribable } from 'rxjs';
import { ToastrService } from 'src/app/toastr.service';
import { PaymentService } from '../payment.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BankslipDetailComponent } from '../bankslip-detail/bankslip-detail.component';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.scss']
})
export class ViewPaymentComponent implements OnChanges {
  @Input('type') type: string;
  total: number;
  isLoading: boolean = false;
  columns: { label: string, key: string }[] = [
    {
      label: "Receipt No",
      key: "receiptNo"
    },
    {
      label: "Date paid",
      key: "datePaid"
    },
    {
      label: "Adm",
      key: "adm"
    },
    {
      label: "Name",
      key: "name"
    },
    {
      label: "Paid by",
      key: "paidBy"
    }
  ];
  payments: any[];

  constructor(
    private toastr: ToastrService,
    private paymentService: PaymentService,
    private dialog: MatDialog
  ) { }

  ngOnChanges() {
    if (this.type) {
      this.getPayments();
    }
  }

  onOptions(options) {
    this.getPayments(options);
  }

  getPayments(options = {}) {
    this.isLoading = true;
    let subscribable: Subscribable<any>;
    if (this.type === "cash") {
      subscribable = this.paymentService.getCash(options);
    } else if (this.type === "bankslip") {
      subscribable = this.paymentService.getBankslips(options);
    } else {
      subscribable = this.paymentService.getMPESA(options);
    }
    subscribable.subscribe(res => {
      this.total = res.total;
      this.payments = res.items;
      this.isLoading = false;
    }, e => {
      this.isLoading = false;
      this.toastr.error("Failed to load payments.");
    });
  }

  viewPayment(nodeName: string, pay) {
    if (nodeName.toLowerCase() !== "td") return;
    let dialog: MatDialogRef<any>;
    const settings = {
      minWidth: "300px",
      minHeight: "500px",
      data: pay
    };
    if (this.type === "bankslip") {
      dialog = this.dialog.open(BankslipDetailComponent, settings);
    } else {
      return;
    }
    dialog.afterClosed()
      .subscribe(res => {
        if (res) {
          this.payments.splice(this.payments.indexOf(pay), 1, res);
        }
      });
  }

  delete(nodeName: string, pay) {
    if (nodeName.toLowerCase() !== "i") return;
    const cnf = this.dialog.open(ConfirmComponent, { width: "300px", height: "150px", data: "Delete payment?" });
    cnf.afterClosed()
      .subscribe(d => {
        if (d) {
          this.paymentService.delete(pay.id)
            .subscribe(r => {
              this.payments.splice(this.payments.indexOf(pay), 1);
              this.toastr.success("Payment deleted successfully.");
            }, e => {
              this.toastr.error("Unable to delete payment");
            });
        }
      });
  }

}
