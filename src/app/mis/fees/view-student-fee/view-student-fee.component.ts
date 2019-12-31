import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'src/app/toastr.service';
import { FeeService } from '../fee.service';

@Component({
  selector: 'app-view-student-fee',
  templateUrl: './view-student-fee.component.html',
  styleUrls: ['./view-student-fee.component.scss']
})
export class ViewStudentFeeComponent implements OnInit {
  isLoading: boolean = false;
  balance: any;

  constructor(
    private toastr: ToastrService,
    private feeService: FeeService
  ) { }

  ngOnInit() {
  }

  view(adm) {
    this.isLoading = true;
    this.feeService.studentBalance(adm)
      .subscribe(res => {
        this.isLoading = false;
        this.balance = res;
        if (!this.balance.debit) {
          this.balance.debit = 0;
        }
        this.balance.balance = this.balance.credit - this.balance.debit;
      }, e => {
        this.isLoading = false;
        this.balance = undefined;
        if (e.status === 404) return this.toastr.error("Student with the given admission number was not found.");
        return this.toastr.error("Failed to get balance.");
      });
  }

}
