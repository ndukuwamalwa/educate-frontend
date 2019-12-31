import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from '../subject.service';
import { ToastrService } from 'src/app/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';
import { SubjectDetailsComponent } from '../subject-details/subject-details.component';

@Component({
  selector: 'app-view-subjects',
  templateUrl: './view-subjects.component.html',
  styleUrls: ['./view-subjects.component.scss']
})
export class ViewSubjectsComponent implements OnInit {
  isLoading: boolean = false;
  subjects: Subject[];

  constructor(
    private subjectService: SubjectService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.subjectService.subjects()
      .subscribe(res => {
        this.subjects = res;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load subjects.");
      });
  }

  more(nodeName: string, s: Subject) {
    if (nodeName.toLowerCase() !== "td") return;
    const d = this.dialog.open(SubjectDetailsComponent, {
      width: "60%",
      height: "60%",
      data: s
    });
    d.afterClosed()
      .subscribe(sub => {
        if (sub) {
          this.subjects.splice(this.subjects.indexOf(s), 1, sub);
        }
      });
  }

  delete(s: Subject) {
    const confirm = this.dialog.open(ConfirmComponent, {
      width: "300px",
      height: "150px",
      data: "Delete subject?"
    });
    confirm.afterClosed()
      .subscribe(res => {
        if (res) {
          this.subjectService.delete(s.id)
            .subscribe(res => {
              this.subjects.splice(this.subjects.indexOf(s), 1);
              this.toastr.success("Subject deleted successfully");
            }, e => {
              this.toastr.error("Failed to delete subject.");
            });
        }
      });
  }

}
