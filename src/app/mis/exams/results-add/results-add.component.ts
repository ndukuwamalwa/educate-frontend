import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam.model';
import { Subject } from 'src/app/models/subject.model';
import { Stream } from 'src/app/models/stream.model';
import { ExamService } from '../exam.service';
import { SubjectService } from '../../subjects/subject.service';
import { ClassService } from '../../classes/class.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-results-add',
  templateUrl: './results-add.component.html',
  styleUrls: ['./results-add.component.scss']
})
export class ResultsAddComponent implements OnInit {
  exams: Exam[];
  subjects: Subject[];
  streams: Stream[];
  selectedExam: number;
  selectedSubject: number;
  selectedStream: number;
  selectedClass: number;
  results: any[];
  isLoading: boolean = false;
  isSavingMarks: boolean = false;

  constructor(
    private examService: ExamService,
    private subjectService: SubjectService,
    private classService: ClassService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.examService.getExams({ type: 'all' })
      .subscribe(res => {
        this.exams = res.items;
      }, e => {
        this.toastr.error("Failed to load exams");
      });
    this.subjectService.subjects()
      .subscribe(res => {
        this.subjects = res;
      }, e => {
        this.toastr.error("Failed to load subjects.");
      });
    this.classService.streams()
      .subscribe(res => {
        this.streams = res;
      }, e => {
        this.toastr.error("Failed to load streams");
      });
  }

  loadResults({ exam, subject, stream }) {
    this.isLoading = true;
    this.selectedExam = +exam;
    this.selectedSubject = +subject;
    this.selectedStream = +stream;
    this.selectedClass = this.streams.find(s => s.id === this.selectedStream).classId;
    this.examService.loadEditableResults(this.selectedExam, this.selectedSubject, this.selectedStream)
      .subscribe(res => {
        this.isLoading = false;
        this.results = res;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load results");
      });
  }

  save(data) {
    this.isSavingMarks = true;
    const results = [];
    for (let key of Object.keys(data)) {
      results.push({
        exam: this.selectedExam,
        class: this.selectedClass,
        stream: this.selectedStream,
        subject: this.selectedSubject,
        student: +key.replace("student_", ""),
        marks: data[key]
      });
    }
    this.examService.saveMarks(results)
      .subscribe(res => {
        this.isSavingMarks = false;
        this.toastr.success("Marks saved successfully.");
      }, e => {
        this.isSavingMarks = false;
        this.toastr.error("Failed to save results.");
      });
  }

}
