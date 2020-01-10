import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-subject-lessoning',
  templateUrl: './subject-lessoning.component.html',
  styleUrls: ['./subject-lessoning.component.scss']
})
export class SubjectLessoningComponent implements OnInit {
  subjects: any[];
  isGettingSubjects: boolean = false;
  isSaving: boolean = false;
  isGettingSetup: boolean = false;
  previous: any = {};

  constructor(
    private subjectService: SubjectService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.isGettingSubjects = true;
    this.isGettingSetup = true;
    this.subjectService.subjects()
      .subscribe(res => {
        this.isGettingSubjects = false;
        this.subjects = res;
      }, e => {
        this.isGettingSubjects = false;
        this.toastr.error("Failed to load subjects.");
      });
    this.subjectService.lessoning()
      .subscribe(res => {
        for (let i of res) {
          this.previous[i.subject] = { lessons: i.lessons, doubles: i.doubles, daytime: i.daytime };
        }
        this.isGettingSetup = false;
      }, e => {
        this.toastr.error("Failed to load previous setup");
      });
  }

  save(data) {
    this.isSaving = true;
    const pack: { subject: number, lessons: number, doubles: number, daytime: string }[] = [];
    const keys = Object.keys(data);
    for (let k of keys) {
      if (k.startsWith("lessons_")) {
        let subject = +k.replace("lessons_", "");
        let lessons = +data[`lessons_${subject}`];
        let doubles = 0;
        if (data[`double_${subject}`]) {
          doubles = +data[`double_${subject}`];
        }
        let daytime = data[`daytime_${subject}`];
        pack.push({
          subject,
          lessons,
          doubles,
          daytime
        });
      }
    }
    this.subjectService.saveLessoning(pack)
      .subscribe(res => {
        this.isSaving = false;
        this.toastr.success("Changes saved successfully.");
      }, e => {
        this.isSaving = false;
        this.toastr.error("Failed to save lesson settings.");
      });
  }

}
