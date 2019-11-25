import { Component, OnInit } from '@angular/core';
import { counties, API } from 'src/app/constants';
import { Student } from 'src/app/models/student.model';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/toastr.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { printUrlWithToken } from 'src/app/utilities';
import { BatchService } from '../../batch/batch.service';
import { environment } from 'src/environments/environment';
import * as xlsx from "xlsx";

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
  api: string = API;
  baseUrl = environment.apiUrl;
  bulkStudents: Student[];
  processingFile: boolean = false;
  isSavingBulk: boolean = false;

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

  viewMisplaced(options = {}) {
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

  processUploadedTemplate(inp: HTMLInputElement) {
    const template = inp.files[0];
    if (!template) return;
    this.processingFile = true;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = xlsx.read(e.target['result'], { type: "buffer" });
      const sheet = data.Sheets.Sheet1;
      if (!sheet) return alert("The file was not filled appropriately or is corrupt.");
      const students: any[] = [];
      let count = 1;
      while (sheet[`A${count}`] !== undefined) {
        let admitted = sheet[`B${count}`].w.split('/');
        let dob = sheet[`F${count}`].w.split('/');
        let student: any = {
          adm: sheet[`A${count}`].w,
          admitted: `${admitted[2]}-${admitted[1]}-${admitted[0]}`,
          fname: sheet[`C${count}`].w,
          lname: sheet[`E${count}`].w,
          dob: `${dob[2]}-${dob[1]}-${dob[0]}`,
          gender: sheet[`G${count}`].w,
          county: sheet[`H${count}`].w,
          state: sheet[`I${count}`].w
        };
        if (sheet[`D${count}`] && sheet[`D${count}`].w) {
          student.mname = sheet[`D${count}`].w;
        } else {
          student.mname = "";
        }
        students.push(student);
        count++;
      }
      this.bulkStudents = students;
      this.processingFile = false;
    };
    reader.readAsArrayBuffer(template);
  }

  saveBulk() {
    this.isSavingBulk = true;
    this.studentService.add(this.bulkStudents, true)
    .subscribe(res => {
      this.isSavingBulk = false;
      this.toastr.success("Students added successfully.");
      this.bulkStudents = undefined;
    }, err => {
      this.isSavingBulk = false;
      if (err.status === 409) return this.toastr.error(`Cannot add students. Conflicts were encountere`);
    });
  }

}
