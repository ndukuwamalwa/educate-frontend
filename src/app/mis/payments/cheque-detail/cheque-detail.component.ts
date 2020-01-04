import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'src/app/toastr.service';
import { PaymentService } from '../payment.service';
import { NgForm } from '@angular/forms';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-cheque-detail',
  templateUrl: './cheque-detail.component.html',
  styleUrls: ['./cheque-detail.component.scss']
})
export class ChequeDetailComponent implements OnInit {
  isLoading: boolean = false;
  isAddingBeneficiary: boolean = false;
  isGettingBeneficiaries: boolean = false;
  beneficiaries: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public cheque: any,
    private toastr: ToastrService,
    private paymentService: PaymentService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getBeneficiaries();
  }

  addBeneficiary(form: NgForm) {
    this.isAddingBeneficiary = true;
    this.paymentService.addBeneficiary({ adm: form.value.adm, amount: form.value.amount, cheque: this.cheque.id })
      .subscribe(res => {
        this.isAddingBeneficiary = false;
        this.toastr.success("Cheque beneficiary added successfully.");
        this.getBeneficiaries();
        form.reset();
      }, e => {
        this.isAddingBeneficiary = false;
        if (e.status === 409) return this.toastr.error("Beneficiary already exists.");
        if (e.status === 404) return this.toastr.error("Student not found.");
        return this.toastr.error("Failed to add beneficiary.");
      });
  }

  deleteBeneficiary(b) {
    const cf = this.dialog.open(ConfirmComponent, {
      width: "auto",
      height: "auto",
      data: "Remove?"
    });
    cf.afterClosed()
      .subscribe(r => {
        if (r) {
          this.paymentService.deleteBeneficiary(b.id)
            .subscribe(res => {
              this.beneficiaries.splice(this.beneficiaries.indexOf(b), 1);
              this.toastr.success("Beneficiary removed successfully.");
              this.getBeneficiaries();
            }, e => {
              this.toastr.error("Unable to remove beneficiary.");
            });
        }
      });
  }

  getBeneficiaries() {
    this.isGettingBeneficiaries = true;
    this.paymentService.getBeneficiaries(this.cheque.id)
      .subscribe(res => {
        this.isGettingBeneficiaries = false;
        this.beneficiaries = res;
        this.cheque.used = 0;
        for (let b of this.beneficiaries) {
          this.cheque.used += b.amount;
        }
        this.cheque.beneficiaries = this.beneficiaries.length;
      }, e => {
        this.isGettingBeneficiaries = false;
        this.toastr.error("Failed to load beneficiaries.");
      });
  }

}
