import { Component, OnInit } from '@angular/core';
import { ExamService } from '../exam.service';
import { ClassService } from '../../classes/class.service';
import { Class } from 'src/app/models/class.model';
import { Stream } from 'src/app/models/stream.model';
import { Exam } from 'src/app/models/exam.model';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss']
})
export class ResultsViewComponent implements OnInit {
  classes: Class[];
  streams: Stream[];
  sortedStreams: Stream[];
  exams: Exam[];
  isLoading: boolean = false;
  results: any[];
  headers: any[];

  constructor(
    private examService: ExamService,
    private classService: ClassService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.examService.getExams({ type: 'all' })
      .subscribe(res => {
        this.exams = res.items;
      }, e => {
        this.toastr.error("Failed to load exams.");
      });
    this.classService.classes()
      .subscribe(res => {
        this.classes = res;
      }, e => {
        this.toastr.error("Failed to load classes");
      });
    this.classService.streams()
      .subscribe(res => {
        this.streams = res;
      }, e => {
        this.toastr.error("Failed to load streams");
      });
  }

  onClassChange(clas) {
    this.sortedStreams = this.streams.filter(s => s.classId === +clas);
  }

  viewResults({ exam, clas, stream }) {
    this.isLoading = true;
    this.examService.marklist(exam, clas, stream)
      .subscribe(res => {
        this.results = res;
        if (this.results.length > 0) {
          this.headers = Object.keys(this.results[0]);
        } else {
          this.headers = [];
        }
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load results");
      });
  }

}
