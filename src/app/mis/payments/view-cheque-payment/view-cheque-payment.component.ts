import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { ToastrService } from 'src/app/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';
import { ChequeDetailComponent } from '../cheque-detail/cheque-detail.component';

@Component({
  selector: 'app-view-cheque-payment',
  templateUrl: './view-cheque-payment.component.html',
  styleUrls: ['./view-cheque-payment.component.scss']
})
export class ViewChequePaymentComponent implements OnInit {
  total: number;
  cheques: any[];
  isLoading: boolean = false;
  sorts: { key: string, label: string }[] = [
    {
      label: "Cheque no.",
      key: "no"
    },
    {
      label: "Bank",
      key: "bank"
    },
    {
      label: "Amount",
      key: "amount"
    },
    {
      label: "Benefited",
      key: "beneficiaries"
    },
    {
      label: "Amount used",
      key: "used"
    },
    {
      label: "Date created",
      key: "created"
    }
  ];

  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCheques();
  }

  onOptions(options) {
    this.getCheques(options);
  }

  getCheques(options = {}) {
    this.isLoading = true;
    this.paymentService.getCheques(options)
      .subscribe(res => {
        this.total = res.total;
        this.cheques = res.items;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load cheques.");
      });
  }

  view(nodeName: string, cheque) {
    if (nodeName.toLowerCase() !== "td") return;
    const dia = this.dialog.open(ChequeDetailComponent, {
      width: "auto",
      height: "auto",
      data: cheque
    });
    dia.afterClosed()
      .subscribe(d => {
        if (d) {
          this.cheques.splice(this.cheques.indexOf(cheque), 1, d);
        }
      });
  }

  delete(nodeName: string, cheque) {
    if (nodeName.toLowerCase() !== "i") return;
    const conf = this.dialog.open(ConfirmComponent, {
      width: "auto",
      height: "auto",
      data: "Delete cheque?"
    });
    conf.afterClosed()
      .subscribe(r => {
        if (r) {
          this.paymentService.deleteCheque(cheque.id)
            .subscribe(res => {
              this.cheques.splice(this.cheques.indexOf(cheque), 1);
              this.toastr.success("Cheque and its beneficiaries have been deleted");
            }, e => {
              this.toastr.error("Failed to delete cheque.");
            });
        }
      });
  }

}
