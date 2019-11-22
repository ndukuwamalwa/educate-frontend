import { Component, OnInit } from '@angular/core';
import { counties } from 'src/app/constants';
import { Student } from 'src/app/models/student.model';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/toastr.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { printUrlWithToken } from 'src/app/utilities';
import { BatchService } from '../../batch/batch.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  counties: string[] = counties;
  commonSorts: string[] = ['id', 'adm', 'admitted', 'fname', 'mname', 'lname', 'dob', 'gender', 'county'];
  leaveSorts: string[] = ['startDate', 'endDate', ...this.commonSorts];
  suspendedSorts: string[] = ['startDate', 'endDate', ...this.commonSorts];
  expelledSorts: string[] = ['dateEffected', ...this.commonSorts];
  archivedSorts: string[] = ['dateEffected', ...this.commonSorts];
  activeStudents: Student[];
  leaveStudents: Student[];
  suspendedStudents: Student[];
  expelledStudents: Student[];
  archivedStudents: Student[];
  misplacedStudents: Student[];
  totalActive: number;
  totalLeave: number;
  totalSuspended: number;
  totalExpelled: number;
  totalArchived: number;
  studentIsAdding: boolean = false;
  isFindingStudents: boolean = false;
  printAllUrl: SafeResourceUrl;
  byDateUrl: SafeResourceUrl;
  byCountyUrl: SafeResourceUrl;
  studentContactsUrl: SafeResourceUrl;
  parentContactsUrl: SafeResourceUrl;
  totalMisplaced: number;
  selectedStudents: number[] = [];
  isAddingToBatch: boolean = false;
  batches: Batch[];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private batchService: BatchService
  ) { }

  ngOnInit() {
    this.batchService.getBatches()
      .subscribe(res => {
        this.batches = res.items;
      }, err => {
        this.toastr.error("Failed to get classes. Some operations will be impossible.");
      });
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

  viewStudents(state: string) {
    state = state.toLowerCase();
    if (this.activeStudents && state === 'active') {
      return;
    }
    if (this.leaveStudents && state === 'leave') {
      return;
    }
    if (this.suspendedStudents && state === 'suspended') {
      return;
    }
    if (this.expelledStudents && state === 'expelled') {
      return;
    }
    if (this.archivedStudents && state === 'archived') {
      return;
    }
    const options = {
      size: 80,
      page: 1,
      sort: -1,
      sortBy: 'id'
    };
    this.getStudents(options, state);
  }

  getStudents(options, state: string) {
    this.isFindingStudents = true;
    state = state.toLowerCase();
    options.state = state;
    this.studentService.getStudents(options)
      .subscribe(res => {
        if (state === 'active') {
          this.totalActive = +res.total;
          this.activeStudents = res.items;
        }
        if (state === 'leave') {
          this.totalLeave = +res.total;
          this.leaveStudents = res.items;
        }
        if (state === 'suspended') {
          this.totalSuspended = +res.total;
          this.suspendedStudents = res.items;
        }
        if (state === 'expelled') {
          this.totalExpelled = +res.total;
          this.expelledStudents = res.items;
        }
        if (state === 'archived') {
          this.totalArchived = +res.total;
          this.archivedStudents = res.items;
        }
        this.isFindingStudents = false;
      }, err => {
        this.toastr.error('Problem loading students.');
        this.isFindingStudents = false;
      });
  }

  onOptionsChange(options, state: string) {
    this.getStudents(options, state);
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

  viewMisplaced(options) {
    this.isFindingStudents = true;
    this.studentService.getMisplaced(options)
      .subscribe(res => {
        this.totalMisplaced = res.total;
        this.misplacedStudents = res.items;
        this.isFindingStudents = false;
      }, err => {
        this.toastr.error("Failed to find misplaced students.");
        this.isFindingStudents = false;
      });
  }

  onMisplacedOptionsChange(options) {
    this.viewMisplaced(options);
  }

  onSelectedStudents(selection: { student: number, add: boolean }) {
    if (selection.add) {
      this.selectedStudents.push(selection.student);
    } else {
      const index = this.selectedStudents.indexOf(this.selectedStudents.find(i => i === selection.student));
      this.selectedStudents.splice(index, 1);
    }
  }

  addToBatch({ batch }) {
    this.isAddingToBatch = true;
    const items = this.selectedStudents.map(student => { return { student, batch } });
    this.batchService.addStudent(items, true)
      .subscribe(res => {
        this.isAddingToBatch = false;
        this.toastr.success(`${this.selectedStudents.length} students have been assigned a class successfully.`);
        this.selectedStudents = [];
        this.viewMisplaced({ sortBy: "admitted", sort: "1" });
      }, err => {
        this.isAddingToBatch = false;
        this.toastr.error(`Failed to add students to class.`);
      });
  }

}
