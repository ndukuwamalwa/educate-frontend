import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-view-class-teachers',
  templateUrl: './view-class-teachers.component.html',
  styleUrls: ['./view-class-teachers.component.scss']
})
export class ViewClassTeachersComponent implements OnInit {
  teachers: any[];
  year: number = new Date().getFullYear();
  years: number[];
  isLoading: boolean = false;

  constructor(
    private teacherService: TeacherService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getTeachers(this.year);
    this.years = [];
    for (let i = this.year; i >= (this.year - 4); i --) {
      this.years.push(i);
    }
  }

  getTeachers(year: number) {
    this.isLoading = true;
    this.teacherService.getClassTeachers(year)
      .subscribe(res => {
        this.teachers = res;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load class teachers.");
      });
  }

  onYearChange(year: number) {
    this.getTeachers(+year);
  }

}
