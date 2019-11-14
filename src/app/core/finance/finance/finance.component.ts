import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../finance.service';
import { ToastrService } from 'src/app/toastr.service';
import { Router } from '@angular/router';
import { BatchService } from '../../batch/batch.service';
import { NgForm } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { PRINT } from 'src/app/constants';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
  balances: any[];
  sorts: string[] = ['adm', 'balance', 'fname', 'lname', 'credit', 'debit'];
  total: number;
  batchTotal: number;
  batches: any;
  studentBalance: any;
  batchBalances: any[];
  selectedBatch: string;
  allPayments: any[];
  totalPayments: number;
  isGettingAllBalances: boolean = false;
  isGettingStudentBalance: boolean = false;
  isGettingBatches: boolean = false;
  isGettingBatchBalances: boolean = false;
  isGettingAllPayments: boolean;
  startDate: string;
  endDate: string;
  isSavingPayment: boolean = false;
  printPaymentsUrl: SafeResourceUrl

  constructor(
    private financeService: FinanceService,
    private toastr: ToastrService,
    private router: Router,
    private batchService: BatchService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getBalances();
  }

  pay(form: NgForm) {
    this.isSavingPayment = true;
    this.financeService.pay(form.value)
      .subscribe(res => {
        this.isSavingPayment = false;
        this.toastr.success("Payment saved successfully.");
        form.reset();
      }, err => {
        this.isSavingPayment = false;
        if (err.status === 409) {
          return this.toastr.error("Transaction number belongs to another stored payment.");
        }
        if (err.status == 404) {
          return this.toastr.error("Student with the given admission number not found.");
        }
        this.toastr.error("Failed to save payment.");
      });
  }

  getBalances(options = {}, force: boolean = false) {
    if (this.balances && !force) return;
    this.isGettingAllBalances = true;
    this.financeService.balances(options)
      .subscribe(res => {
        this.balances = res.items;
        this.total = res.total;
        this.isGettingAllBalances = false;
      }, err => {
        this.isGettingAllBalances = false;
        this.toastr.error('Failed to get balances.');
      });
  }

  onPaginationChange(options) {
    this.getBalances(options, true);
  }

  viewStudent(id) {
    this.router.navigate(['students', id]);
  }

  getStudentBalance(adm) {
    this.isGettingStudentBalance = true;
    this.financeService.getStudentBalanceByAdm(adm)
      .subscribe(res => {
        this.studentBalance = res;
        this.isGettingStudentBalance = false;
      }, err => {
        this.isGettingStudentBalance = false;
        if (err.status === 404) {
          return this.toastr.error('Student with given admission number was not found.');
        }
        this.toastr.error('Failed to get balance.');
      });
  }

  getBatches() {
    if (this.batches) return;
    this.isGettingBatches = true;
    this.batchService.getBatches()
      .subscribe(res => {
        this.batches = res.items;
        this.isGettingBatches = false;
      }, err => {
        this.toastr.error('Failed to get batches');
        this.isGettingBatches = false;
      });
  }

  getBatchBalance(batch, options = {}) {
    this.selectedBatch = batch;
    this.isGettingBatchBalances = true;
    this.financeService.getBatchBalance(batch, options)
      .subscribe(res => {
        this.batchBalances = res.items;
        this.batchTotal = res.total;
        this.isGettingBatchBalances = false;
      }, err => {
        this.toastr.error(`Failed to get balances`);
        this.isGettingBatchBalances = false;
      });
  }

  onBatchOptionsChange(options) {
    this.getBatchBalance(this.selectedBatch, options);
  }

  getPayments(options = {}, force: boolean = false) {
    if (this.allPayments && !force) return;
    this.isGettingAllPayments = true;
    this.financeService.getPayments(options)
      .subscribe(res => {
        this.allPayments = res.items;
        this.totalPayments = res.total;
        this.isGettingAllPayments = false;
      }, err => {
        this.toastr.error('Failed to get payments.');
        this.isGettingAllPayments = false;
      });
  }

  onPaymentOptions(options) {
    this.getPayments(options, true);
  }

  viewByDate({ startDate, endDate }) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.getPayments({ startDate, endDate }, true);
  }

  onDatePaymentOptions(options) {
    this.getPayments({ startDate: this.startDate, endDate: this.endDate, ...options }, true);
  }

  printPayments({ startDate, endDate }) {
    const url = `${PRINT}/payments?startDate=${startDate}&endDate=${endDate}`;
    this.printPaymentsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
