import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-hostel-dash',
  templateUrl: './hostel-dash.component.html',
  styleUrls: ['./hostel-dash.component.scss']
})
export class HostelDashComponent implements OnInit {
  total: number;
  capacity: number;
  types: { type: string, total: number }[];
  isLoading: boolean = false;

  constructor(private dashService: DashboardService, private toastr: ToastrService) { }

  ngOnInit() {
    this.isLoading = true;
    this.dashService.getDashboard('/hostel')
      .subscribe(res => {
        this.total = res.total[0].total;
        this.capacity = res.capacity[0].total;
        this.types = res.types;
        this.isLoading = false;
      }, err => {
        this.toastr.error('Failed to load statistics.');
        this.isLoading = false;
      });
  }

}
