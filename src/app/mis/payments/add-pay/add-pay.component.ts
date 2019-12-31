import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ToastrService } from 'src/app/toastr.service';
import { PaymentService } from '../payment.service';
import { FormBuilder, Validators, NgForm, FormGroup } from '@angular/forms';
import { StudentsService } from '../../students/students.service';
import { Subscribable } from 'rxjs';

@Component({
  selector: 'app-add-pay',
  templateUrl: './add-pay.component.html',
  styleUrls: ['./add-pay.component.scss']
})
export class AddPayComponent implements OnChanges {
  @Input('isLoading') isLoading: boolean = false;
  @Input('data') data: any;
  @Input('type') type: string;
  @Input('title') title: string;
  @Output('submitted') submitted: EventEmitter<any> = new EventEmitter();
  paymentForm = this.fb.group({
    acknowledger: ['', [Validators.required, Validators.pattern(/^[a-z ]+$/i)]],
    receiptNo: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+$/i)]],
    paidBy: ['', [Validators.required, Validators.pattern(/^[a-z' ]+$/i)]],
    student: ['', [Validators.required]],
    datePaid: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.min(1)]]
  });
  results: any;

  constructor(
    private toastr: ToastrService,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private studentService: StudentsService
  ) { }

  ngOnChanges() {
    if (this.data) {
      this.paymentForm.setValue({
        acknowledger: this.data.acknowledger,
        receiptNo: this.data.receiptNo,
        paidBy: this.data.paidBy,
        student: this.data.adm,
        datePaid: this.data.datePaid,
        amount: this.data.amount
      });
    }
    if (this.type) {
      if (this.type === 'cash') {
        this.paymentForm.removeControl("acknowledger");
        this.paymentForm.removeControl("receiptNo");
      }
    }
  }

  onSubmit(form: FormGroup) {
    if (this.data) {
      this.submitted.emit(form.value);
      return;
    }
    this.isLoading = false;
    let subscribable: Subscribable<any>;
    if (this.type.toLowerCase() === "cash") {
      subscribable = this.paymentService.addCash(form.value)
    } else {
      subscribable = this.paymentService.addBankslip(form.value)
    }
    subscribable
      .subscribe(res => {
        this.isLoading = false;
        this.toastr.success("Payment added successfully.");
        form.reset();
      }, e => {
        this.isLoading = false;
        if (e.status === 404) return this.toastr.error("Student with the given admission number was not found.");
        if (e.status === 409) return this.toastr.error("A similar payment exists.");
        return this.toastr.error("Failed to create payment. Please retry.");
      });
  }

  onAdm(adm) {
    this.studentService.check(adm)
      .subscribe(res => {
        this.results = res;
      }, e => {
        if (e.status == 404) return this.toastr.error("Student with the given admission number was not found.");
      });
  }

}
