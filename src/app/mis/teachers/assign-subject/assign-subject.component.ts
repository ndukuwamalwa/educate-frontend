import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class.model';
import { Stream } from 'src/app/models/stream.model';
import { ToastrService } from 'src/app/toastr.service';
import { ClassService } from '../../classes/class.service';
import { TeacherService } from '../teacher.service';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from '../../subjects/subject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-subject',
  templateUrl: './assign-subject.component.html',
  styleUrls: ['./assign-subject.component.scss']
})
export class AssignSubjectComponent implements OnInit {
  year: number = new Date().getFullYear();
  classes: Class[];
  streams: Stream[];
  teachers: any[];
  subjects: Subject[];
  isGettingStreams: boolean = false;
  isGettingClasses: boolean = false;
  isGettingTeachers: boolean = false;
  isGettingSubjects: boolean = false;
  filteredStreams: Stream[];
  isSaving: boolean = false;
  previous: any = {};
  selectedClass: number;

  constructor(
    private toastr: ToastrService,
    private classService: ClassService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isGettingStreams = true;
    this.isGettingClasses = true;
    this.isGettingTeachers = true;
    this.isGettingSubjects = true;
    this.classService.streams()
      .subscribe(res => {
        this.isGettingStreams = false;
        this.streams = res;
      }, e => {
        this.isGettingStreams = false;
        this.toastr.error("Failed to load streams");
      });
    this.classService.classes()
      .subscribe(res => {
        this.isGettingClasses = false;
        this.classes = res;
      }, e => {
        this.toastr.error("Failed to load classes");
        this.isGettingClasses = false;
      });
    this.subjectService.subjects()
      .subscribe(res => {
        this.isGettingSubjects = false;
        this.subjects = res;
      }, e => {
        this.toastr.error("Failed to load subjects");
        this.isGettingSubjects = false;
      });
    this.teacherService.allActive()
      .subscribe(res => {
        this.isGettingTeachers = false;
        this.teachers = res.map(t => {
          t.name = `${t.fname} ${t.lname}`;
          return t;
        });
      }, e => {
        this.toastr.error("Failed to load teachers");
        this.isGettingTeachers = false;
      });
  }

  getPrevious() {
    if (!this.selectedClass) return;
    this.isSaving = true;
    this.teacherService.getSubjectAssignments(this.selectedClass, this.year)
      .subscribe(res => {
        for (let r of res) {
          this.previous[`${r.streamId}-${r.subjectId}`] = +r.teacherId;
        }
        this.isSaving = false;
      }, e => {
        this.isSaving = false;
        this.toastr.error("Could not get previous assignments.");
      });
  }

  onYearChange() {
    this.getPrevious();
  }

  onClassChange(c) {
    this.filteredStreams = this.streams.filter(s => +s.classId === +c);
    this.selectedClass = +c;
    this.getPrevious();
  }

  save(data) {
    this.isSaving = true;
    const pack: { teacher: number, stream: number, subject: number, year: number }[] = [];
    const year = data.year;
    const keys = Object.keys(data);
    for (let k of keys) {
      let split = k.split('-');
      if (split.length < 2) continue;
      if (!data[k] || data[k] === "") continue;
      let teacher = +data[k];
      let stream = +split[0];
      let subject = +split[1];
      pack.push({
        teacher,
        stream,
        subject,
        year
      });
    }
    if (pack.length === 0) {
      this.isSaving = false;
      return;
    };
    this.teacherService.saveSubjectAssignment(pack)
      .subscribe(res => {
        this.isSaving = false;
        this.toastr.success("Saved successfully.");
        this.router.navigateByUrl(`/teachers/subjects/view?year=${year}&class=${data.class}`);
      }, e => {
        this.isSaving = false;
        this.toastr.error("Failed to save subject assignment to teachers.");
      });
  }

}
