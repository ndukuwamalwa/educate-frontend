import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-fee-dash',
  templateUrl: './fee-dash.component.html',
  styleUrls: ['./fee-dash.component.scss']
})
export class FeeDashComponent implements OnInit {
  average: number;
  month: number;
  outlierMax: number;
  outlierMin: number;
  today: number;
  total: number;
  week: number;
  year: number;
  isLoading: boolean = false;

  constructor(private dashService: DashboardService, private toastr: ToastrService) { }

  ngOnInit() {
    this.isLoading = true;
    this.dashService.getDashboard('/fee-payment')
      .subscribe(res => {
        this.average = res.average[0].avg;
        this.month = res.month[0].total;
        this.outlierMax = res.outlierMax[0].max;
        this.outlierMin = res.outlierMin[0].min;
        this.today = res.today[0].total;
        this.total = res.total[0].total;
        this.week = res.week[0].total;
        this.year = res.year[0].total;
        this.isLoading = false;
      }, err => {
        this.toastr.error('Failed to load statistics.');
        this.isLoading = false;
      });
  }

}
