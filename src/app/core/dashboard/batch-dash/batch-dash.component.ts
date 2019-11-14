import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-batch-dash',
  templateUrl: './batch-dash.component.html',
  styleUrls: ['./batch-dash.component.scss']
})
export class BatchDashComponent implements OnInit {
  total: number;
  studentCounts: { batch: string, total: number }[];
  isLoading: boolean = false;

  constructor(private dashService: DashboardService, private toastr: ToastrService) { }

  ngOnInit() {
    this.isLoading = true;
    this.dashService.getDashboard('/batch')
    .subscribe(res => {
      this.total = res.total[0].total;
      this.studentCounts = res.students;
      this.isLoading = false;
    }, err => {
      this.toastr.error('Failed to load statistics.');
      this.isLoading = false;
    });
  }

}
