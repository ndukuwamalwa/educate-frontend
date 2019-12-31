import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject.model';
import { Stream } from 'src/app/models/stream.model';
import { SubjectService } from '../subject.service';
import { ClassService } from '../../classes/class.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-subject-register',
  templateUrl: './subject-register.component.html',
  styleUrls: ['./subject-register.component.scss']
})
export class SubjectRegisterComponent implements OnInit {
  isLoading: boolean = false;
  subjects: Subject[];
  streams: Stream[];
  selectedStudents: number[] = [];
  students: any[];
  selectedSubject: number;
  selectedClass: number;
  selectedStream: number;
  isGettingStudents: boolean = false;

  constructor(
    private subjectService: SubjectService,
    private classService: ClassService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.subjectService.subjects()
      .subscribe(res => {
        this.subjects = res.filter(s => s.core === 0);
      }, e => {
        this.toastr.error("Failed to load subjects");
      });
    this.classService.streams()
      .subscribe(res => {
        this.streams = res;
      }, e => {
        this.toastr.error("Failed to load classes.");
      });
  }

  load({ stream, subject }) {
    this.selectedStream = + stream;
    this.selectedClass = this.streams.find(s => +s.id === +stream).classId;
    this.selectedSubject = +subject;
    this.isGettingStudents = true;
    this.subjectService.nonregistered(this.selectedSubject, +stream)
      .subscribe(res => {
        this.isGettingStudents = false;
        this.students = res;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load students.");
      });
  }

  register() {
    this.isLoading = true;
    const pkt = [...this.selectedStudents].map(id => {
      return {
        student: id,
        subject: this.selectedSubject,
        class: this.selectedClass
      };
    });
    this.subjectService.register(pkt)
      .subscribe(res => {
        this.toastr.success("Students registered for the selected subject.");
        this.isLoading = false;
        this.selectedStudents = [];
        this.load({ stream: this.selectedStream, subject: this.selectedSubject });
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Refresh page and try again");
        this.toastr.error("Failed to register students");
      });
  }

  check(id) {
    const index = this.selectedStudents.indexOf(+id);
    if (index === -1) {
      this.selectedStudents.push(+id);
    } else {
      this.selectedStudents.splice(index, 1);
    }
  }

}
