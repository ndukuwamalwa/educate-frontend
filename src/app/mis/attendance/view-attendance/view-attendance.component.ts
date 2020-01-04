import { Component, OnInit, Input } from '@angular/core';
import { Stream } from 'src/app/models/stream.model';
import { Class } from 'src/app/models/class.model';
import { ClassService } from '../../classes/class.service';
import { ToastrService } from 'src/app/toastr.service';
import { AttendanceService } from '../attendance.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss']
})
export class ViewAttendanceComponent implements OnInit {

  @Input('type') type: string;
  attendances: any[];
  streams: Stream[];
  classes: Class[];
  isLoading: boolean = false;

  constructor(
    private classService: ClassService,
    private toastr: ToastrService,
    private attendanceService: AttendanceService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.classService.streams()
      .subscribe(res => {
        this.streams = res;
      }, e => {
        this.toastr.error("Failed to load streams");
      });
    this.classService.classes()
      .subscribe(res => {
        this.classes = res;
      }, e => {
        this.toastr.error("Failed to load classes.");
      });
  }

  viewStreamAttendance({ stream, date }) {
    this.isLoading = true;
    this.attendanceService.getStreamAttendance(stream, date)
      .subscribe(res => {
        this.attendances = res;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load attendance.");
      });
  }

  viewClassAttendance({ clas, date }) {
    this.isLoading = true;
    this.attendanceService.getClassAttendance(clas, date)
      .subscribe(res => {
        this.attendances = res;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load attendance.");
      });
  }

  viewStudentAttendande({ adm, startDate, endDate }) {
    this.isLoading = true;
    this.attendanceService.getStudentAttendance(adm, startDate, endDate)
      .subscribe(res => {
        this.attendances = res;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load attendance.");
      });
  }

  deleteAttendance(a) {
    const conf = this.dialog.open(ConfirmComponent, {
      width: "auto",
      height: "auto",
      data: "Delete?"
    });
    conf.afterClosed()
      .subscribe(r => {
        if (r) {
          this.attendanceService.delete(a.id)
            .subscribe(r => {
              this.toastr.success("Record deleted successfully.");
              this.attendances.splice(this.attendances.indexOf(a), 1);
            }, e => {
              this.toastr.error("Failed to delete record.");
            });
        }
      });
  }

}
