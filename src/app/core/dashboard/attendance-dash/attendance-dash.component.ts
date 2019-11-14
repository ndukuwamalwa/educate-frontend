import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-attendance-dash',
  templateUrl: './attendance-dash.component.html',
  styleUrls: ['./attendance-dash.component.scss']
})
export class AttendanceDashComponent implements OnInit {
  attendance: number;
  expected: number;
  isLoading: boolean = false;

  constructor(
    private dashService: DashboardService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.dashService.getDashboard(`/attendance`)
      .subscribe(res => {
        this.expected = res.expected[0].total;
        this.attendance = res.today[0].total;
        this.isLoading = false;
      }, err => {
        this.toastr.error('Failed to load statistics.');
        this.isLoading = false;
      });
  }

}
