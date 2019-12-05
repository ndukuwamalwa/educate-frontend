import { Component, OnInit } from '@angular/core';
import { ExamService } from '../exam.service';
import { ToastrService } from 'src/app/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../subject/subject.service';
import { ClassService } from '../../class/class.service';
import { back, printUrlWithToken } from 'src/app/utilities';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.scss']
})
export class ExamPageComponent implements OnInit {
  isGettingDetails: boolean = false;
  id: string | number;
  back = back;
  exam: any;
  gradings: any[];
  isSaving: boolean = false;
  classes: Class[];
  subjects: any[];
  selectedClass: number | string;
  selectedSubject: number | string;
  isLoadingStudents: boolean = false;
  selectedStudents: any[];
  isSavingResults: boolean = false;
  results: any[];
  isGettingResults: boolean = false;
  shortSubjectNames: any[];
  streams: any[];
  classStreams: any[];
  reportCardsUrl: SafeResourceUrl;

  constructor(
    private examService: ExamService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private classService: ClassService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isGettingDetails = true;
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.examService.getExam(this.id)
        .subscribe(res => {
          this.exam = res;
          this.isGettingDetails = false;
        }, err => {
          this.toastr.error("Failed to get exam details.");
          this.isGettingDetails = false;
        });
    });
    this.examService.getGrading()
      .subscribe(res => {
        this.gradings = res.items;
      }, er => {
        this.toastr.error("Failed to get grading schemes.");
      });
    this.subjectService.getSubjects()
      .subscribe(res => {
        this.subjects = res.items;
        this.shortSubjectNames = res.items.map(sub => {
          sub.name = sub.name.substring(0, 3).toUpperCase();
          return sub;
        });
      }, er => {
        this.toastr.error("Failed to load subjects");
      });
    this.classService.getClasses()
      .subscribe(res => {
        this.classes = res.items;
      }, er => {
        this.toastr.error("Failed to get classes.");
      });
    this.classService.getStreams()
      .subscribe(res => {
        this.streams = res.items;
      }, er => {
        this.toastr.error("Failed to load streams");
      });
  }

  getClassStreams(classId) {
    const streams = this.streams.filter(val => +val.classId === +classId);
    this.classStreams = streams;
  }

  updateExam(data) {
    this.isSaving = true;
    data.id = this.id;
    this.examService.updateExam(data)
      .subscribe(res => {
        this.exam = { ...this.exam, ...data };
        this.toastr.success("Exam updated successfully");
        this.isSaving = false;
      }, err => {
        this.isSaving = false;
        if (err.status === 409) return this.toastr.error("Exam with the given name already exists.");
        this.toastr.error("Failed to update exam.");
      });
  }

  getStudents({ clas, subject }) {
    this.selectedClass = clas;
    this.selectedSubject = subject;

    this.isLoadingStudents = true;
    this.subjectService.getRegisteredStudents(subject, clas)
      .subscribe(res => {
        this.selectedStudents = res;
        this.examService.getEnteredMarks(this.id, this.selectedSubject)
          .subscribe(res => {
            const marks = res;
            marks.forEach(result => {
              const student = this.selectedStudents.find(stud => +stud.studentId === +result.student);
              if (student) {
                student.marks = result.marks;
              }
            });
            this.isLoadingStudents = false;
          }, err => {
            this.toastr.error("Failed to get previously entered marks.");
          });
      }, err => {
        this.toastr.error("Failed to load students.");
        this.isLoadingStudents = false;
      });
  }

  addResults(results) {
    this.isSavingResults = true;
    const valid = [];
    const keys = Object.keys(results);
    for (let key of keys) {
      if (results[key] !== "" && Number.parseFloat(results[key])) {
        valid.push({
          student: key.split('_')[1],
          exam: this.id,
          class: this.selectedClass,
          subject: this.selectedSubject,
          marks: +results[key],
          grade: '',
          enteredBy: null
        });
      }
    }
    this.examService.addResults(valid)
      .subscribe(res => {
        this.toastr.success("Results added/updated successfully.");
        this.isSavingResults = false;
      }, err => {
        this.toastr.error("Failed to add results.");
        this.isSavingResults = false;
      });
  }

  viewResults(clas, stream) {
    this.isGettingResults = true;
    this.examService.getClassResults(clas, stream, this.id)
      .subscribe(res => {
        for (let result of res) {
          let subjects = [];
          for (let sub of this.shortSubjectNames) {
            let exists = result.subjects.find(val => +val.subject === +sub.id);
            if (exists) {
              subjects.push(exists);
            } else {
              subjects.push({ marks: '-', subject: sub.id, name: sub.name });
            }
          }
          result.subjects = subjects;
        }
        this.results = res;
        this.isGettingResults = false;
      }, err => {
        this.toastr.error("Failed to get results.");
        this.isGettingResults = false;
      });
  }

  printReportCards(data) {
    let cat = data.stream.toLowerCase() === 'all' ? 'class' : 'stream';
    let id = (cat === 'stream') ? data.stream : data.class;
    const url = printUrlWithToken(`/exams/cards/${cat}?id=${id}&exam=${this.id}`);
    this.reportCardsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
