import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'src/app/toastr.service';
import { TeacherService } from '../teacher.service';
import { ClassService } from '../../classes/class.service';
import { ActivatedRoute } from '@angular/router';
import { Class } from 'src/app/models/class.model';

@Component({
  selector: 'app-view-teacher-subjects',
  templateUrl: './view-teacher-subjects.component.html',
  styleUrls: ['./view-teacher-subjects.component.scss']
})
export class ViewTeacherSubjectsComponent implements OnInit {
  isGettingData: boolean = false;
  selectedClass: number;
  classes: Class[];
  teacherSubjects: any[];
  year: number = new Date().getFullYear();
  years: number[];

  constructor(
    private toastr: ToastrService,
    private teacherService: TeacherService,
    private classService: ClassService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.classService.classes()
      .subscribe(res => {
        this.classes = res;
      }, e => {
        this.toastr.error("Failed to load classes");
      });
    this.route.queryParams.subscribe(p => {
      if (p.class && p.year) {
        this.selectedClass = +p.class;
        this.year = +p.year;
        this.load({ year: this.year, clas: this.selectedClass });
      }
    });
    this.years = [];
    for (let i = this.year; i >= (this.year - 4); i--) {
      this.years.push(i);
    }
  }

  load({ year, clas }) {
    this.selectedClass = +clas;
    this.year = +year;
    this.isGettingData = true;
    this.teacherService.getSubjectAssignments(this.selectedClass, this.year)
      .subscribe(res => {
        this.teacherSubjects = res;
        this.isGettingData = false;
      }, e => {
        this.isGettingData = false;
        this.toastr.error("Failed to get data.");
      });
  }

}
