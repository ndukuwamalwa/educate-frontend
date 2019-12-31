import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'src/app/toastr.service';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cheque-payment',
  templateUrl: './add-cheque-payment.component.html',
  styleUrls: ['./add-cheque-payment.component.scss']
})
export class AddChequePaymentComponent implements OnInit {
  @Input('title') title: string;
  @Input('isLoading') isLoading: boolean = false;
  @Input('data') data: any;
  @Output('submitted') submitted: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private paymentService: PaymentService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  save(form: NgForm) {
    if (this.data) {
      this.submitted.emit(form.value);
      return;
    }
    this.isLoading = true;
    this.paymentService.addCheque(form.value)
      .subscribe(res => {
        this.isLoading = false;
        this.toastr.success("Cheque added successfully.");
        this.router.navigate(['payments', 'cheque', 'view']);
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Cheque with the given number exists.");
        return this.toastr.error("Failed to add cheque.");
      });
  }

}
