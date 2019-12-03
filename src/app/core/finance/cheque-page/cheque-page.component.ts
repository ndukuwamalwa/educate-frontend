import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../finance.service';
import { ToastrService } from 'src/app/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../student/student.service';
import { back, printUrlWithToken } from 'src/app/utilities';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cheque-page',
  templateUrl: './cheque-page.component.html',
  styleUrls: ['./cheque-page.component.scss']
})
export class ChequePageComponent implements OnInit {
  cheque: any;
  id: number;
  isGettingDetails: boolean = false;
  isSavingCheque: boolean = false;
  isGettingPreview: boolean = false;
  previewResults: any;
  previewStudents: any[];
  isSavingBeneficiaries: boolean = false;
  beneficiaries: any[];
  isGettingBeneficiaries: boolean = false;
  totalBeneficiaries: number;
  back = back;
  equalShare: boolean = false;
  shareAmount = null;
  storedShare = null;
  exceeded: boolean = false;
  printBeneficiariesUrl: SafeResourceUrl;

  constructor(
    private financeService: FinanceService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isGettingDetails = true;
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.financeService.getCheque(this.id)
        .subscribe(res => {
          this.cheque = res;
          this.isGettingDetails = false;
        }, e => {
          this.isGettingDetails = false;
          this.toastr.error("Failed to get details.");
        });
    });
  }

  updateCheque(data) {
    this.isSavingCheque = true;
    data.id = this.id;
    this.financeService.updateCheque(data)
      .subscribe(res => {
        this.cheque = { ...this.cheque, ...data };
        this.isSavingCheque = false;
        this.toastr.success("Cheque details updated successfully.");
      }, e => {
        this.isSavingCheque = false;
        if (e.status === 409) return this.toastr.error("Cheque number already exists.");
        if (e.status === 400) return this.toastr.error(e.error.message);
        this.toastr.error("Failed to update details.");
      });
  }

  previewBeneficiaries(data) {
    this.isGettingPreview = true;
    let adms = data.adms;
    const sharing = data.sharing ? data.sharing.toLowerCase() : "";
    adms = adms.split(",").map(v => v.trim());
    const noDups = new Set(adms);
    adms = [];
    noDups.forEach(val => {
      adms.push(val);
    });
    if (sharing === "equal") {
      this.shareAmount = this.cheque.amount/adms.length;
      this.equalShare = true;
    } else {
      this.equalShare = false;
    }
    this.studentService.getPreviewByAdms(adms)
      .subscribe(res => {
        this.previewResults = res.meta;
        this.previewStudents = res.items;
        this.isGettingPreview = false;
      }, e => {
        this.isGettingPreview = false;
        this.toastr.error("Failed to load students.");
      });
  }

  changeShareMode(equal: boolean) {
    this.equalShare = equal;
    if (equal && this.storedShare !== null) {
      this.shareAmount = this.storedShare;
    } else {
      this.storedShare = this.shareAmount;
      this.shareAmount = null;
    }
  }

  sumAmounts() {
    let amount = 0;
    const amounts: HTMLCollection = document.getElementsByClassName("amount-to-subtract-or-award");
    for (let i = 0; i < amounts.length; i++) {
      let inp = (amounts[i] as HTMLInputElement);
      let value = inp.value;
      if (value.trim() === '') {
        value = '0';
      }
      amount += +value;
    }
    if (this.cheque.used === null) {
      if (amount > +this.cheque.amount) return this.exceeded = true;
      this.exceeded = false;
    } else {
      if (amount > +this.cheque.unused) return this.exceeded = true;
      this.exceeded = false;
    }
  }

  addBeneficiaries(data) {
    this.isSavingBeneficiaries = true;
    const beneficiaries: { cheque: number, student: number, amount: number }[] = [];
    const keys = Object.keys(data);
    keys.forEach(key => {
      beneficiaries.push({ cheque: this.id, student: +key.split('_')[1], amount: data[key] });
    });
    this.financeService.addBeneficiaries(beneficiaries)
      .subscribe(res => {
        this.toastr.success("Beneficiaries added successfully.");
        this.previewResults = undefined;
        this.previewStudents = undefined;
        this.isSavingBeneficiaries = false;
        this.ngOnInit();
      }, e => {
        this.isSavingBeneficiaries = false;
        if (e.status === 409) return this.toastr.error("Found duplicate beneficiaries. Operation halted.");
        if (e.status === 400) return this.toastr.error(e.error.message);
        this.toastr.error("Failed to add beneficiaries.");
      });
  }

  getBeneficiaries(options = {}) {
    this.isGettingBeneficiaries = false;
    this.financeService.getBeneficiaries(this.id, options)
      .subscribe(res => {
        this.totalBeneficiaries = res.total;
        this.beneficiaries = res.items;
        this.isGettingBeneficiaries = false;
      }, e => {
        this.toastr.error("Failed to load beneficiaries.");
        this.isGettingBeneficiaries = false;
      });
  }

  onPaginationChange(options) {
    this.getBeneficiaries(options);
  }

  removeBeneficiary(id) {
    if (!confirm("Are you sure you want to remove this beneficiary?")) return;
    this.financeService.deleteBeneficiary(id)
      .subscribe(res => {
        const i = this.beneficiaries.indexOf(this.beneficiaries.find(v => +v.id === +id));
        this.beneficiaries.splice(i, 1);
        this.ngOnInit();
      }, e => {
        this.toastr.error("Failed to delete cheque beneficiary.");
      });
  }

  delete() {
    if (!confirm("Are you sure you want to delete this cheque?")) return;
    this.financeService.deleteCheque(this.id)
    .subscribe(res => {
      this.toastr.success("Cheque has been deleted successfully.");
      this.router.navigate(['finance']);
    }, e => {
      this.toastr.error("Unable to delete cheque.");
    });
  }

  printBeneficiaries() {
    const url = printUrlWithToken(`/cheques/beneficiaries?id=${this.id}`);
    this.printBeneficiariesUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
