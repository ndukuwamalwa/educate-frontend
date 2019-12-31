import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HostelService } from '../hostel.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-hostel-details',
  templateUrl: './hostel-details.component.html',
  styleUrls: ['./hostel-details.component.scss']
})
export class HostelDetailsComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public hostel: any,
    private hostelService: HostelService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  update(data) {
    this.isLoading = true;
    this.hostelService.update(data, this.hostel.id)
      .subscribe(res => {
        this.isLoading = false;
        this.toastr.success("Hostel details updated successfully.");
        this.hostel = { ...this.hostel, ...data };
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Hostel with the given name exists.");
        return this.toastr.error("Failed to update hostel.");
      });
  }

}
