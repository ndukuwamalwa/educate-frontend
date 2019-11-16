import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from 'src/app/models/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { back, getDatesBetween, getDayOfTheWeek, printUrlWithToken } from 'src/app/utilities';
import { counties } from 'src/app/constants';
import { NgForm } from '@angular/forms';
import { BatchService } from '../../batch/batch.service';
import { SubjectService } from '../../subject/subject.service';
import { ExamService } from '../../exams/exam.service';
import { FinanceService } from '../../finance/finance.service';
import { InstituteService } from '../../institute/institute.service';
import { ToastrService } from 'src/app/toastr.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent implements OnInit {
  student: Student;
  isOld: boolean;
  id: number;
  back = back;
  counties: string[] = counties;
  contacts: any[];
  attendances: any[];
  batches: Batch[];
  feeToAdd: number;
  studentBatches: any[];
  totalCharge: number;
  subjects: any[];
  subjectBasket: number[] = [];
  registeredSubjects: any[];
  examResults: any[];
  exams: any[];
  payments: any[];
  totalPayment: number;
  hostels: any[];
  isGettingBasicInfo: boolean = false;
  isUpdatingStudent: boolean = false;
  isAddingContact: boolean = false;
  isGettingContacts: boolean = false;
  isGettingAttendance: boolean = false;
  isGettingBatches: boolean = false;
  isAddingBatch: boolean = false;
  isGettingStudentBatches: boolean = false;
  isGettingSubjects: boolean = false;
  isRegisteringSubjects: boolean = false;
  isGettingStudentSubjects: boolean = false;
  isGettingExams: boolean = false;
  isGettingResults: boolean = false;
  isGettingPayments: boolean = false;
  isGettingHostels: boolean = false;
  isDeletingStudent: boolean = false;
  printChargesUrl: SafeResourceUrl;
  printPaymentsUrl: SafeResourceUrl;
  isViewingPrintableCharges: boolean;
  isViewingPrintablePayments: boolean;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private batchService: BatchService,
    private subjectService: SubjectService,
    private examService: ExamService,
    private financeService: FinanceService,
    private instituteService: InstituteService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isGettingBasicInfo = true;
    this.route.params
      .subscribe(params => {
        this.id = +params.id;
        this.studentService.getStudent(this.id)
          .subscribe(res => {
            this.student = res;
            this.isGettingBasicInfo = false;
          }, err => {
            this.toastr.error(`Failed to get student's information. Please refresh page.`);
            this.isGettingBasicInfo = false;
          });
      });
    this.printChargesUrl = this.sanitizer.bypassSecurityTrustResourceUrl(printUrlWithToken(`/student/invoice?id=${this.id}`));
    this.printPaymentsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(printUrlWithToken(`/payments?student=${this.id}`));
  }

  calculateTotalCharge() {
    if (this.studentBatches) {
      if (this.studentBatches.length === 0) {
        this.totalCharge = 0;
        return;
      };
      let sum = 0;
      for (let studentBatch of this.studentBatches) {
        sum += studentBatch.amount;
      }
      this.totalCharge = sum;
    }
  }

  getSubjects() {
    this.isGettingSubjects = true;
    this.getBaches();
    this.subjectService.getSubjects()
      .subscribe(res => {
        this.subjects = res.items;
        this.isGettingSubjects = false;
      }, err => {
        this.toastr.warning('Unable to load subjects.');
        this.isGettingSubjects = false;
      });
  }

  updateStudent(data: Student) {
    this.isUpdatingStudent = true;
    data.id = this.id;
    this.studentService.update(data)
      .subscribe(res => {
        for (let key of Object.keys(data)) {
          this.student[key] = data[key];
        }
        this.toastr.success('Student information updated successfully.');
        this.isUpdatingStudent = false;
      }, err => {
        this.toastr.error('Unable to update student information.');
        this.isUpdatingStudent = false;
      });
  }

  addContact(form: NgForm) {
    this.isAddingContact = true;
    const contact = form.value;
    contact.student = this.id;
    this.studentService.addContact(contact)
      .subscribe(res => {
        if (this.contacts) {
          this.contacts.push(contact);
        }
        form.reset();
        this.toastr.success('Contact added successfully.');
        this.isAddingContact = false;
      }, err => {
        this.toastr.error('Failed to add contact.');
        this.isAddingContact = false;
      });
  }

  getContacts() {
    if (this.contacts) {
      return;
    }
    this.isGettingContacts = true;
    this.studentService.getContacts(this.id)
      .subscribe(res => {
        this.contacts = res;
        this.isGettingContacts = false;
      }, err => {
        this.toastr.error('Failed to get contacts');
        this.isGettingContacts = false;
      });
  }

  getAttendance(startDate, endDate) {
    this.isGettingAttendance = true;
    this.studentService.getAttendance(this.id, startDate, endDate)
      .subscribe(res => {
        this.attendances = res;
        const allDates: string[] = getDatesBetween(startDate, endDate);
        this.attendances = allDates.map(date => {
          let day = getDayOfTheWeek(date);
          let state = "Absent";
          if (res.find(att => att.day === date)) {
            state = "Present"
          }
          return { day, state, date };
        });
        this.isGettingAttendance = false;
      }, err => {
        this.toastr.error('Unable to load student attendance');
        this.isGettingAttendance = false;
      });

  }

  getBaches() {
    if (this.batches) {
      return;
    }
    this.isGettingBatches = true;
    this.batchService.getBatches()
      .subscribe(res => {
        this.batches = res.items;
        this.isGettingBatches = false;
      }, err => {
        this.toastr.error('Failed get batches/classes.');
        this.isGettingBatches = false;
      });
  }

  onBatchChange(id) {
    id = +id;
    const batch = this.batches.find(b => b.id === id);
    this.feeToAdd = batch.fees;
  }

  addToBatch(data) {
    this.isAddingBatch = true;
    data.student = this.id;
    this.batchService.addStudent(data)
      .subscribe(res => {
        setTimeout(() => {
          if (this.studentBatches && this.batches) {
            this.studentBatches = undefined;
            this.viewBatches(true);
          }
          this.toastr.success('Student added to batch/class successfully.');
          this.isAddingBatch = false;
        }, 5000);
      }, err => {
        this.toastr.error('Failed to add student to batch/class');
        this.isAddingBatch = false;
      });
  }

  viewBatches(force: boolean = false) {
    if (this.studentBatches && !force) {
      return;
    }
    this.isGettingStudentBatches = true;
    this.batchService.getStudentBatches(this.id)
      .subscribe(res => {
        this.studentBatches = res;
        this.calculateTotalCharge();
        if (!this.payments) {
          this.getPayments();
        }
        this.isGettingStudentBatches = false;
      }, err => {
        this.toastr.error('Failed to get classes/batches associated with the student.');
        this.isGettingStudentBatches = false;
      });
  }


  removeBatch(id) {
    const confirm = window.confirm('Are you sure you want to remove batch and the associated fee?');
    if (confirm) {
      this.batchService.removeStudent(id)
        .subscribe(res => {
          const removed = this.studentBatches.find(val => +val.id === +id);
          this.studentBatches.splice(this.studentBatches.indexOf(removed), 1);
          this.calculateTotalCharge();
          this.toastr.success('Batch/Class removed successfully.');
        });
    }
  }

  onSelectionChange(event, id) {
    if (event.target.checked) {
      this.subjectBasket.push(+id);
    } else {
      const index = this.subjectBasket.indexOf(+id);
      this.subjectBasket.splice(index, 1);
    }
  }

  addSubject(form: NgForm) {
    this.isRegisteringSubjects = true;
    const batch = +form.value.batch;
    const body = [];
    this.subjectBasket.forEach(val => {
      body.push({ student: this.id, subject: val, batch });
    });
    this.subjectService.registerBulk(body)
      .subscribe(res => {
        this.viewStudentSubjects({ batch });
        this.subjectBasket = [];
        form.reset();
        this.toastr.success('Subjects added successfully.');
        this.isRegisteringSubjects = false;
      }, err => {
        this.toastr.error('Failed to add subject(s).');
        this.isRegisteringSubjects = false;
      });
  }

  viewStudentSubjects(formValue) {
    this.isGettingStudentSubjects = true;
    const batch = formValue.batch;
    this.subjectService.getStudentSubjects(batch, this.id)
      .subscribe(res => {
        this.registeredSubjects = res;
        this.isGettingStudentSubjects = false;
      }, err => {
        this.toastr.error('Failed to get registered subjects.');
        this.isGettingStudentSubjects = false;
      });
  }

  removeSubject(regId) {
    const confirm = window.confirm("Are you sure you want to remove subject?");
    if (confirm) {
      this.subjectService.deregister(regId)
        .subscribe(res => {
          const index = this.registeredSubjects.indexOf(this.registeredSubjects.find(val => +val.id === +regId));
          this.registeredSubjects.splice(index, 1);
          this.toastr.success('Subject deregistered successfully.');
        }, err => {
          this.toastr.error('Unable to remove subject.');
        });
    }
  }

  getExams() {
    if (this.exams) {
      return;
    }
    this.isGettingExams = true;
    this.examService.getExams()
      .subscribe(res => {
        this.exams = res.items;
        this.isGettingExams = false;
      }, err => {
        this.toastr.warning('Failed to get list of exams.');
        this.isGettingExams = false;
      });
  }

  viewResults({ exam }) {
    this.isGettingResults = true;
    this.examService.getStudentResults(exam, this.id)
      .subscribe(res => {
        this.examResults = res;
        this.isGettingResults = false;
      }, err => {
        this.toastr.error('Unable to view results. Please retry.');
        this.isGettingResults = false;
      });
  }

  getPayments() {
    if (this.payments) {
      return;
    }
    if (!this.totalCharge) {
      this.viewBatches();
    }
    this.isGettingPayments = true;
    this.financeService.getStudentPayments(this.id)
      .subscribe(res => {
        this.payments = res;
        let total = 0;
        for (let payment of this.payments) {
          total += payment.amount;
        }
        this.totalPayment = total;
        this.isGettingPayments = false;
      }, err => {
        this.toastr.error('Unable to fetch payments.');
        this.isGettingPayments = false;
      });
  }

  getHostels() {
    if (this.hostels) {
      return;
    }
    this.isGettingHostels = true;
    this.instituteService.getStudentHostels(this.id)
      .subscribe(res => {
        this.hostels = res;
        this.isGettingHostels = false;
      }, err => {
        this.toastr.error('Failed to fetch hostels.');
        this.isGettingHostels = false;
      });
  }

  delete() {
    const confirm = window.confirm(`Are you sure you want to delete student?`);
    if (!confirm) return;
    this.isDeletingStudent = true;
    this.studentService.delete(this.id)
      .subscribe(res => {
        this.router.navigate(['students']);
        this.isDeletingStudent = false;
        this.toastr.success('Student deleted successfully.');
      }, err => {
        this.toastr.error('Failed to delete student.');
        this.isDeletingStudent = false;
      });
  }

  toggleView(property: string) {
    if (this[property] && (this[property] === true)) {
      this[property] = false;
    } else {
      this[property] = true;
    }
  }

}
