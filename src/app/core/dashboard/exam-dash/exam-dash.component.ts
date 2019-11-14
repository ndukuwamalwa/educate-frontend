import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-exam-dash',
  templateUrl: './exam-dash.component.html',
  styleUrls: ['./exam-dash.component.scss']
})
export class ExamDashComponent implements OnInit {
  total: number;
  averages: { name: string, avg: number }[];
  isLoading: boolean = false;

  constructor(private dashService: DashboardService, private toastr: ToastrService) { }

  ngOnInit() {
    this.isLoading = true;
    this.dashService.getDashboard('/exams')
      .subscribe(res => {
        this.total = res.total[0].total;
        this.averages = res.averages;
        this.isLoading = false;
      }, err => {
        this.toastr.error('Failed to load statistics.');
        this.isLoading = false;
      });
  }

}
