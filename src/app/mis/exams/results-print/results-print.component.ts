import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class.model';
import { Stream } from 'src/app/models/stream.model';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from '../exam.service';
import { ClassService } from '../../classes/class.service';
import { ToastrService } from 'src/app/toastr.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-results-print',
  templateUrl: './results-print.component.html',
  styleUrls: ['./results-print.component.scss']
})
export class ResultsPrintComponent implements OnInit {
  classes: Class[];
  streams: Stream[];
  sortedStreams: Stream[];
  exams: Exam[];
  url: SafeResourceUrl;

  constructor(
    private examService: ExamService,
    private classService: ClassService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private auth: AuthService
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

  print({ exam, clas, stream }) {
    const url = `${environment.apiUrl}/api/exams/results/print?exam=${exam}&class=${clas}&stream=${stream}`;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${url}&token=${this.auth.token}`);
  }

}
