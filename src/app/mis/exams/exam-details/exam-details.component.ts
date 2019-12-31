import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from '../exam.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.scss']
})
export class ExamDetailsComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public exam: Exam,
    private examService: ExamService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  update(data) {
    this.isLoading = true;
    this.examService.update(data, this.exam.id)
    .subscribe( res => {
      this.isLoading = false;
      this.toastr.success("Exam updated successfully.");
      this.exam = {...this.exam, ...data};
    }, e => {
      this.isLoading = false;
      if (e.status === 409) return this.toastr.error("Exam title matches another exam");
      return this.toastr.error("Failed to update exam");
    });
  }

}
