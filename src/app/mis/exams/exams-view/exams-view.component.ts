import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Exam } from 'src/app/models/exam.model';
import { Subscribable } from 'rxjs';
import { ToastrService } from 'src/app/toastr.service';
import { ExamService } from '../exam.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';
import { ExamDetailsComponent } from '../exam-details/exam-details.component';

@Component({
  selector: 'app-exams-view',
  templateUrl: './exams-view.component.html',
  styleUrls: ['./exams-view.component.scss']
})
export class ExamsViewComponent implements OnChanges {
  @Input('mode') mode: string;
  total: number;
  exams: Exam[];
  isLoading: boolean = false;
  sorts: { key: string, label: string }[] = [
    {
      label: "Title",
      key: "name"
    },
    {
      label: "Start date",
      key: "startDate"
    },
    {
      label: "End date",
      key: "endDate"
    },
    {
      label: "Term",
      key: "term"
    }
  ];

  constructor(
    private toastr: ToastrService,
    private examService: ExamService,
    private dialog: MatDialog
  ) { }

  ngOnChanges() {
    if (this.mode) {
      this.getExams();
    }
  }

  getExams(options = {}) {
    this.isLoading = true;
    options['type'] = this.mode.toLowerCase();
    this.examService.getExams(options)
      .subscribe(res => {
        this.isLoading = false;
        this.exams = res.items;
        this.total = res.total;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load exams.");
      });
  }

  onOptions(options) {
    this.getExams(options);
  }

  update(nodeName: string, exam) {
    if (nodeName.toLowerCase() !== 'td') return;
    const dia = this.dialog.open(ExamDetailsComponent, {
      width: "auto",
      height: "auto",
      data: exam
    });
    dia.afterClosed()
    .subscribe(res => {
      if (res) {
        this.exams.splice(this.exams.indexOf(exam), 1, res);
      }
    });
  }

  delete(nodeName: string, exam) {
    if (nodeName.toLowerCase() !== 'i') return;
    const cf = this.dialog.open(ConfirmComponent, {
      width: "auto",
      height: "auto",
      data: "Delete exam?"
    });
    cf.afterClosed()
      .subscribe(r => {
        if (r) {
          this.examService.delete(exam.id)
            .subscribe(res => {
              this.exams.splice(this.exams.indexOf(exam), 1);
              this.toastr.success("Exam deleted successfully.");
            }, e => {
              this.toastr.error("Failed to delete exam.");
            });
        }
      });
  }

}
