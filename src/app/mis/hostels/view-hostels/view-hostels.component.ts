import { Component, OnInit } from '@angular/core';
import { HostelService } from '../hostel.service';
import { ToastrService } from 'src/app/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';
import { HostelDetailsComponent } from '../hostel-details/hostel-details.component';

@Component({
  selector: 'app-view-hostels',
  templateUrl: './view-hostels.component.html',
  styleUrls: ['./view-hostels.component.scss']
})
export class ViewHostelsComponent implements OnInit {
  hostels: any[];
  isLoading: boolean = false;

  constructor(
    private hostelService: HostelService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.hostelService.list()
      .subscribe(res => {
        this.hostels = res;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load hostels");
      });
  }

  delete(nodeName: string, hostel) {
    if (nodeName.toLowerCase() !== "i") return;
    const conf = this.dialog.open(ConfirmComponent, {
      width: "300px",
      height: "150px",
      data: "Delete hostel?"
    });
    conf.afterClosed()
      .subscribe(res => {
        if (res) {
          this.hostelService.delete(hostel.id)
            .subscribe(r => {
              this.hostels.splice(this.hostels.indexOf(hostel), 1);
              this.toastr.success("Hostel deleted successfully.");
            }, e => {
              this.toastr.error("Failed to delete hostel.");
            });
        }
      });
  }

  update(nodeName: string, hostel) {
    if (nodeName.toLowerCase() !== 'td') return;
    const dia = this.dialog.open(HostelDetailsComponent, {
      minWidth: '50%',
      height: '60%',
      data: hostel
    });
    dia.afterClosed()
      .subscribe(r => {
        if (r) {
          this.hostels.splice(this.hostels.indexOf(hostel), 1, r);
        }
      });
  }

}
