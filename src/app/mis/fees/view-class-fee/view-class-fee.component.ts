import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class.model';
import { ClassService } from '../../classes/class.service';
import { FeeService } from '../fee.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-view-class-fee',
  templateUrl: './view-class-fee.component.html',
  styleUrls: ['./view-class-fee.component.scss']
})
export class ViewClassFeeComponent implements OnInit {

  classes: Class[];
  selected: number;
  balances: any[];
  isLoading: boolean = false;
  total: number;
  sorts: { label: string, key: string }[] = [
    {
      key: "adm",
      label: "Adm"
    },
    {
      key: "name",
      label: "Name"
    },
    {
      key: "debit",
      label: "Total paid"
    }
  ];
  columns: { label: string, key: string }[] = [
    {
      label: "Adm",
      key: "adm"
    },
    {
      label: "Name",
      key: "name"
    },
    {
      label: "Credit",
      key: "credit"
    },
    {
      label: "Debit",
      key: "debit"
    },
    {
      label: "Balance",
      key: "balance"
    }
  ];

  constructor(
    private classService: ClassService,
    private feeService: FeeService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.classService.classes()
      .subscribe(r => {
        this.classes = r;
      }, e => {
        this.toastr.error("Failed to load classes");
      });
  }

  onClassChange(str: number) {
    this.selected = +str;
    this.getBalances();
  }

  onOptions(options) {
    this.getBalances(options);
  }

  getBalances(options = {}) {
    this.isLoading = true;
    this.feeService.classBalance(this.selected, options)
      .subscribe(res => {
        this.total = res.total;
        this.balances = res.items.map(b => {
          if (!b.debit) {
            b.debit = 0;
          }
          b.balance = b.credit - b.debit;
          return b;
        });
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to fetch balances.");
      });
  }

}
