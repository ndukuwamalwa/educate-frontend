import { Component, OnInit } from '@angular/core';
import { counties } from 'src/app/constants';
import { Student } from 'src/app/models/student.model';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/toastr.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { printUrlWithToken } from 'src/app/utilities';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  counties: string[] = counties;
  total: number;
  sortingKeys: string[] = ['id', 'adm', 'admitted', 'fname', 'mname', 'lname', 'dob', 'gender', 'county'];
  students: Student[];
  studentIsAdding: boolean = false;
  isFindingStudents: boolean = false;
  printAllUrl: SafeResourceUrl;
  byDateUrl: SafeResourceUrl;
  byCountyUrl: SafeResourceUrl;
  studentContactsUrl: SafeResourceUrl;
  parentContactsUrl: SafeResourceUrl;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  addStudent(data: Student) {
    this.studentIsAdding = true;
    this.studentService.add(data)
      .subscribe(res => {
        this.toastr.success('Student created successfully.');
        this.router.navigate(['students', res.id]);
        this.studentIsAdding = false;
      }, err => {
        if (err.status === 409) {
          this.toastr.error('Admission number has already been used.');
        } else {
          this.toastr.error('Failed to add new student. Please retry.');
        }
        this.studentIsAdding = false;
      });
  }

  viewDetails(id) {
    this.router.navigate(['students', id]);
  }

  viewStudents() {
    if (this.students) {
      return;
    }
    const options = {
      size: 80,
      page: 1,
      sort: -1,
      sortBy: 'id'
    };
    this.getStudents(options);
  }

  getStudents(options) {
    this.isFindingStudents = true;
    this.studentService.getStudents(options)
      .subscribe(res => {
        this.total = +res.total;
        this.students = res.items;
        this.isFindingStudents = false;
      }, err => {
        this.toastr.error('Problem loading students.');
        this.isFindingStudents = false;
      });
  }

  onOptionsChange(options) {
    this.getStudents(options);
  }

  printAll() {
    if (this.printAllUrl) return;
    this.printAllUrl = this.sanitizer.bypassSecurityTrustResourceUrl(printUrlWithToken(`/students`));
  }

  printByDate({ startDate, endDate, gender }) {
    let url: string = printUrlWithToken(`/students?startDate=${startDate}&endDate=${endDate}`);
    if (gender.toLowerCase() !== 'all') {
      url = `${url}&gender=${gender}`;
    }
    this.byDateUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  printByCounty({ county, gender }) {
    let url: string = printUrlWithToken(`/students?county=${county}`);
    if (gender.toLowerCase() !== 'all') {
      url = `${url}&gender=${gender}`;
    }
    this.byCountyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  printContacts(printFor: string) {
    if (printFor === 'students' && this.studentContactsUrl) return;
    if (printFor === 'parents' && this.parentContactsUrl) return;
    const url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(printUrlWithToken(`/${printFor}/contacts`));
    if (printFor === 'students') {
      this.studentContactsUrl = url;
    } else {
      this.parentContactsUrl = url;
    }
  }

}
