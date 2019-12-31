import { Component, OnInit } from '@angular/core';
import { Stream } from 'src/app/models/stream.model';
import { ClassService } from '../class.service';
import { ToastrService } from 'src/app/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-stream-students',
  templateUrl: './stream-students.component.html',
  styleUrls: ['./stream-students.component.scss']
})
export class StreamStudentsComponent implements OnInit {
  selectedStream: number;
  streams: Stream[];
  total: number;
  students: any[];
  isLoading: boolean = false;
  sorts: { label: string, key: string }[] = [
    {
      label: "Adm",
      key: "adm"
    },
    {
      label: "First name",
      key: "fname"
    },
    {
      label: "Last name",
      key: "lname"
    },
    {
      label: "Gender",
      key: "gender"
    }
  ];

  constructor(
    private classService: ClassService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.classService.streams()
      .subscribe(res => {
        this.streams = res;
      }, e => {
        this.toastr.error("Failed to load streams.");
      });
  }

  onStreamChange(stream: number) {
    this.selectedStream = stream;
    this.getStudents();
  }

  onOptions(options) {
    this.getStudents(options);
  }

  getStudents(options = {}) {
    this.isLoading = true;
    this.classService.getStreamStudents(this.selectedStream, options)
      .subscribe(res => {
        this.isLoading = false;
        this.students = res.items;
        this.total = res.total;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load students.");
      });
  }

  delete(s) {
    const confirm = this.dialog.open(ConfirmComponent, {
      width: "300px",
      height: "200px",
      data: "Remove student? NOTE: This removes the student from the class as well."
    });
    confirm.afterClosed()
      .subscribe(r => {
        if (r) {
          this.classService.removeStreamStudent(s.studentId)
            .subscribe(res => {
              this.toastr.info("Student removed successfully. Please consider adding the student to a new class.");
              this.students.splice(this.students.indexOf(s), 1);
            }, e => {
              this.toastr.error("Failed to remove student from class.");
            });
        }
      })
  }

}
