import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-employee-dash',
  templateUrl: './employee-dash.component.html',
  styleUrls: ['./employee-dash.component.scss']
})
export class EmployeeDashComponent implements OnInit {
  averageAge: number;
  averageSalary: number;
  categories: [];
  countyBottoms: [];
  countyTops: [];
  genders: [];
  qualifications: [];
  total: number;
  wageBill: number;
  isLoading: boolean = false;

  constructor(private dashService: DashboardService, private toastr: ToastrService) { }

  ngOnInit() {
    this.isLoading = true;
    this.dashService.getDashboard('/employees')
    .subscribe(res => {
      this.averageAge = res.averageAge[0].avg;
      this.averageSalary = res.averageSalary[0].avg;
      this.total = res.total[0].total;
      this.wageBill = res.wageBill[0].total;
      this.categories = res.category;
      this.countyBottoms = res.countyBottom;
      this.countyTops = res.countyTop;
      this.genders = res.gender;
      this.qualifications = res.qualification;
      this.isLoading = false;
    }, err => {
      this.toastr.error('Failed to load statistics.');
      this.isLoading = false;
    });
  }

}
