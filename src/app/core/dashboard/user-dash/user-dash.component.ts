import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.scss']
})
export class UserDashComponent implements OnInit {
  total: number;
  types: any[];
  states: any[];
  isLoading: boolean = false;

  constructor(private dashService: DashboardService, private toastr: ToastrService) { }

  ngOnInit() {
    this.isLoading = true;
    this.dashService.getDashboard('/users')
    .subscribe(res => {
      this.total = res.total[0].total;
      this.types = res.types;
      this.states = res.states;
      this.isLoading = false;
    }, err => {
      this.toastr.error('Failed to load statistics.');
      this.isLoading = false;
    });
  }

}
