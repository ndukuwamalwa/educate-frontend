import { Component, OnInit } from '@angular/core';
import { Stream } from 'src/app/models/stream.model';
import { ClassService } from '../class.service';
import { ToastrService } from 'src/app/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';
import { StreamDetailsComponent } from '../stream-details/stream-details.component';

@Component({
  selector: 'app-view-streams',
  templateUrl: './view-streams.component.html',
  styleUrls: ['./view-streams.component.scss']
})
export class ViewStreamsComponent implements OnInit {
  isLoading: boolean = false;
  streams: Stream[];

  constructor(
    private classService: ClassService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.classService.streams()
      .subscribe(res => {
        this.streams = res;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load streams");
      });
  }

  viewStream(nodeName: string, stream: Stream) {
    if (nodeName.toLowerCase() !== "td") return;
    const dialog = this.dialog.open(StreamDetailsComponent, {
      minWidth: "70%",
      height: "60%",
      data: stream
    });
    dialog.afterClosed()
      .subscribe(r => {
        if (r) {
          this.streams.splice(this.streams.indexOf(stream), 1, r);
        }
      });
  }

  delete(stream: Stream) {
    const confirm = this.dialog.open(ConfirmComponent, {
      width: "300px",
      height: "150px",
      data: "Delete stream?"
    });
    confirm.afterClosed()
      .subscribe(r => {
        if (r) {
          this.classService.deleteStream(stream.id)
            .subscribe(res => {
              this.toastr.success("Class deleted successfully.");
              this.streams.splice(this.streams.indexOf(stream), 1);
            });
        }
      }, e => {
        if (e.status === 409) return this.toastr.error("Cannot delete stream with students/streams");
        return this.toastr.error("Failed to delete stream");
      });
  }

}
