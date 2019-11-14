import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-subject-dash',
  templateUrl: './subject-dash.component.html',
  styleUrls: ['./subject-dash.component.scss']
})
export class SubjectDashComponent implements OnInit {
  batchEnrollments: [];
  enrollments: [];
  total: number;
  isLoading: boolean = false;

  constructor(private dashService: DashboardService, private toastr: ToastrService) { }

  ngOnInit() {
    this.isLoading = true;
    this.dashService.getDashboard('/subjects')
      .subscribe(res => {
        this.total = res.total[0].total;
        this.batchEnrollments = res.batchEnrollment;
        this.enrollments = res.enrollment;
        this.isLoading = false;
      }, err => {
        this.toastr.error('Failed to load statistics.');
        this.isLoading = false;
      });
  }

}
