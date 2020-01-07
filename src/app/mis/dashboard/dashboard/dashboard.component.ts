import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: any;
  isLoading: boolean = false;
  constructor(
    private dashService: DashboardService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.dashService.stats()
      .subscribe(res => {
        this.isLoading = false;
        this.stats = res;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Data failed to load.");
      });
  }

}
