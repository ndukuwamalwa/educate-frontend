import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrls: ['./student-dash.component.scss']
})
export class StudentDashComponent implements OnInit {
  averageAge: number;
  countyBottoms: [];
  countyTops: [];
  genders: [];
  genderAges: [];
  recent: number;
  recentGenders: [];
  total: number;
  isLoading: boolean = false;

  constructor(private dashService: DashboardService, private toastr: ToastrService) { }

  ngOnInit() {
    this.isLoading = true;
    this.dashService.getDashboard('/students')
      .subscribe(res => {
        this.averageAge = res.averageAge[0].avg;
        this.countyBottoms = res.countyBottom;
        this.countyTops = res.countyTop;
        this.genders = res.gender;
        this.genderAges = res.genderAge;
        this.recent = res.recent[0].total;
        this.recentGenders = res.recentGender;
        this.total = res.total[0].total;
        this.isLoading = false;
      }, err => {
        this.toastr.error('Failed to load statistics.');
        this.isLoading = false;
      });
  }

}
