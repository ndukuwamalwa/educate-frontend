import { Component, OnInit } from '@angular/core';
import { Stream } from 'src/app/models/stream.model';
import { Subject } from 'src/app/models/subject.model';
import { ClassService } from '../../classes/class.service';
import { SubjectService } from '../subject.service';
import { ToastrService } from 'src/app/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-view-subject-register',
  templateUrl: './view-subject-register.component.html',
  styleUrls: ['./view-subject-register.component.scss']
})
export class ViewSubjectRegisterComponent implements OnInit {
  isLoading: boolean = false;
  streams: Stream[];
  subjects: Subject[];
  students: any[];

  constructor(
    private classService: ClassService,
    private subjectService: SubjectService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.classService.streams()
      .subscribe(res => {
        this.streams = res;
      }, e => {
        this.toastr.error("Failed to load streams");
      });
    this.subjectService.subjects()
      .subscribe(res => {
        this.subjects = res.filter(s => s.core === 0);
      }, e => {
        this.toastr.error("Failed to load subjects");
      });
  }

  load({ stream, subject }) {
    this.isLoading = true;
    this.subjectService.viewRegister(subject, stream)
      .subscribe(res => {
        this.students = res;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load students");
      });
  }

  remove(reg) {
    const confirm = this.dialog.open(ConfirmComponent, {
      width: "auto",
      height: "auto",
      data: "Remove student?"
    });
    confirm.afterClosed()
      .subscribe(r => {
        if (r) {
          this.subjectService.deregister(reg.id)
            .subscribe(res => {
              this.students.splice(this.students.indexOf(reg), 1);
              this.toastr.success("Student deregistered from subject successfully.");
            }, e => {
              this.toastr.error("Failed to deregister subject.");
            });
        }
      });
  }

}
