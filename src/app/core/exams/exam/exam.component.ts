import { Component, OnInit } from '@angular/core';
import { ExamService } from '../exam.service';
import { ToastrService } from 'src/app/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  exams: any[];
  isSaving: boolean = false;
  gradings: any[];
  isGettingExams: boolean = false;
  total: number;

  constructor(
    private examService: ExamService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.examService.getGrading()
      .subscribe(res => {
        this.gradings = res.items;
      }, err => {
        this.toastr.error("Failed to get grading schemes.");
      });
  }

  addExam(data) {
    this.isSaving = true;
    this.examService.add(data)
      .subscribe(res => {
        this.isSaving = false;
        this.toastr.success("Exam added successfully.");
        this.router.navigate(['exams', res.id]);
      }, err => {
        this.isSaving = false;
        if (err.status === 409) return this.toastr.error("Exam with the given name already exists.");
        this.toastr.error("Failed to add exam");
      });
  }

  getExams(options = {}, force: boolean = false) {
    if (this.exams && !force) return;
    this.isGettingExams = true;
    this.examService.getExams(options)
      .subscribe(res => {
        this.total = res.total;
        this.exams = res.items;
        this.isGettingExams = false;
      }, err => {
        this.isGettingExams = false;
        this.toastr.error("Problem fetching exams.");
      });
  }

  onOptionsChange(options) {
    this.getExams(options, true);
  }

  viewDetails(id) {
    this.router.navigate(['exams', id]);
  }

}
