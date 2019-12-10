import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../finance.service';
import { ToastrService } from 'src/app/toastr.service';
import { Router } from '@angular/router';
import { ClassService } from '../../class/class.service';
import { NgForm } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { printUrlWithToken } from 'src/app/utilities';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
  balances: any[];
  sorts: string[] = ['adm', 'balance', 'fname', 'lname', 'credit', 'debit'];
  total: number;
  classTotal: number;
  classes: any;
  studentBalance: any;
  classBalances: any[];
  selectedClass: string;
  allPayments: any[];
  totalPayments: number;
  isGettingAllBalances: boolean = false;
  isGettingStudentBalance: boolean = false;
  isGettingClasses: boolean = false;
  isGettingClassBalances: boolean = false;
  isGettingAllPayments: boolean;
  startDate: string;
  endDate: string;
  isSavingPayment: boolean = false;
  printPaymentsUrl: SafeResourceUrl;
  printChequesUrl: SafeResourceUrl;
  isSavingCheque: boolean = false;
  isGettingCheques: boolean = false;
  totalCheques: number;
  cheques: any[];

  constructor(
    private financeService: FinanceService,
    private toastr: ToastrService,
    private router: Router,
    private clasService: ClassService,
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
        if (err.status === 422) return this.toastr.error(err.error.message);
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

  getClasses() {
    if (this.classes) return;
    this.isGettingClasses = true;
    this.clasService.getClasses()
      .subscribe(res => {
        this.classes = res.items;
        this.isGettingClasses = false;
      }, err => {
        this.toastr.error('Failed to get clases');
        this.isGettingClasses = false;
      });
  }

  getClassBalance(clas, options = {}) {
    this.selectedClass = clas;
    this.isGettingClassBalances = true;
    this.financeService.getClassBalance(clas, options)
      .subscribe(res => {
        this.classBalances = res.items;
        this.classTotal = res.total;
        this.isGettingClassBalances = false;
      }, err => {
        this.toastr.error(`Failed to get balances`);
        this.isGettingClassBalances = false;
      });
  }

  onClassOptionsChange(options) {
    this.getClassBalance(this.selectedClass, options);
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
    const url = printUrlWithToken(`/payments?startDate=${startDate}&endDate=${endDate}`);
    this.printPaymentsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  printCheques({ startDate, endDate }) {
    const url = printUrlWithToken(`/cheques?startDate=${startDate}&endDate=${endDate}`);
    this.printChequesUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  addCheque(data) {
    this.isSavingCheque = true;
    this.financeService.addCheque(data)
      .subscribe(res => {
        this.isSavingCheque = false;
        this.toastr.success("Cheque added successfully.");
        this.router.navigate(['finance', 'cheque', res.id]);
      }, err => {
        this.isSavingCheque = false;
        if (err.status === 422) return this.toastr.error(err.error.message);
        if (err.status === 409) return this.toastr.error("Cheque number already exists.");
        this.toastr.error("Failed to add cheque.");
      });
  }

  viewCheques(options = {}) {
    this.isGettingCheques = true;
    this.financeService.getCheques(options)
      .subscribe(res => {
        this.totalCheques = res.total;
        this.cheques = res.items;
        this.isGettingCheques = false;
      }, e => {
        this.isGettingCheques = false;
        this.toastr.error("Failed to get cheques.");
      });
  }

  onChequePageChange(options) {
    this.viewCheques(options);
  }

  viewCheque(id) {
    this.router.navigate(['finance', 'cheque', id]);
  }

}
