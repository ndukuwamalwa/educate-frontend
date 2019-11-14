import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { ToastrService } from 'src/app/toastr.service';
import { NgForm } from '@angular/forms';
import { HrService } from '../../hr/hr.service';
import { Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { PRINT } from 'src/app/constants';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  teachers: any[];
  total: number;
  employees: any[];
  sorts: string[] = ['id', 'empNo', 'employee', 'gender', 'phone', 'email'];
  isGettingTeachers: boolean = false;
  isAddingTeacher: boolean = false;
  isGettingEmployees: boolean = false;
  printUrl: SafeResourceUrl;

  constructor(
    private teacherService: TeacherService,
    private toastr: ToastrService,
    private hrService: HrService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.isGettingEmployees = true;
    this.hrService.getNonTeachers()
    .subscribe(res => {
      this.employees = res;
      this.isGettingEmployees = false;
    }, err => {
      this.toastr.error('Failed to load employees.');
      this.isGettingEmployees = false;
    });
  }

  viewTeachers() {
    if (this.teachers) return;
    this.getTeachers();
  }

  getTeachers(options = {}) {
    this.isGettingTeachers = true;
    this.teacherService.getTeachers(options)
    .subscribe(res => {
      this.total = res.total;
      this.teachers = res.items;
      this.isGettingTeachers = false;
    }, err => {
      this.toastr.error("Unable to load teachers.");
      this.isGettingTeachers = false;
    });
  }

  addTeacher(form: NgForm) {
    this.isAddingTeacher = true;
    this.teacherService.add(form.value.employee)
    .subscribe(res => {
      const emp = this.employees.find(val => +val.id === +form.value.employee);
      const index = this.employees.indexOf(emp);
      this.employees.splice(index, 1);
      this.toastr.success('Teacher added successfully.');
      this.isAddingTeacher = false;
      this.getTeachers();
    }, err => {
      if (err.status === 409) {
        return this.toastr.error('Teacher already exists');
      }
      this.toastr.error('Failed to add teacher. Please  retry.');
      this.isAddingTeacher = false;
    });
  }

  onOptionsChange(options) {
    this.getTeachers(options);
  }

  viewTeacher(id) {
    this.router.navigate(['teachers', id]);
  }

  print() {
    if (this.printUrl) return;
    this.printUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${PRINT}/teachers`);
  }

}
