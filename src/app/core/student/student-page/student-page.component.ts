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
  isChangingStudentState: boolean = false;
  isSavingLeave: boolean = false;
  printChargesUrl: SafeResourceUrl;
  printPaymentsUrl: SafeResourceUrl;
  isViewingPrintableCharges: boolean;
  isViewingPrintablePayments: boolean;
  oldStudent: boolean = false;
  leaves: any[];
  suspensions: any[];
  isGettingLeaves: boolean = false;
  isSavingSuspension: boolean = false;
  isGettingSuspensions: boolean = false;

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
            if (this.student.state.toLowerCase() === 'active') {
              this.oldStudent = false;
            } else {
              this.oldStudent = true;
            }
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
        this.isAddingBatch = false;
        if (err.status === 409) return this.toastr.error("Student exists in the selected class.");
        this.toastr.error('Failed to add student to batch/class');
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
    this.isChangingStudentState = true;
    this.studentService.delete(this.id)
      .subscribe(res => {
        this.router.navigate(['students']);
        this.isChangingStudentState = false;
        this.toastr.success('Student deleted successfully.');
      }, err => {
        this.toastr.error('Failed to delete student.');
        this.isChangingStudentState = false;
      });
  }

  archive() {
    if (!confirm("Archive this student? This makes the student inactive in the system.")) return;
    const reason = window.prompt("Reason for archiving student");
    if (reason.length === 0) return window.alert("You must provide a reason for archiving student record.");
    this.isChangingStudentState = true;
    this.studentService.archive(this.id, reason)
      .subscribe(res => {
        this.oldStudent = true;
        this.toastr.success("Student archived successfully.");
        this.isChangingStudentState = false;
        this.student.state = "ARCHIVED";
      }, err => {
        this.isChangingStudentState = false;
        this.toastr.error("Failed to archive record.");
      });
  }

  expell() {
    if (!confirm("Expell this student?")) return;
    const reason = window.prompt("Reason for expelling student");
    if (reason.length === 0) return window.alert("You must provide a reason for expelling student.");
    this.isChangingStudentState = true;
    this.studentService.expell(this.id, reason)
      .subscribe(res => {
        this.oldStudent = true;
        this.toastr.success("Student expelled successfully.");
        this.isChangingStudentState = false;
        this.student.state = "EXPELLED";
      }, err => {
        this.isChangingStudentState = false;
        this.toastr.error("Failed to expelled record.");
      });
  }

  restore() {
    if (!confirm("Restore this student? The record will be activated in the system.")) return;
    this.isChangingStudentState = true;
    this.studentService.restore(this.id)
      .subscribe(res => {
        this.oldStudent = false;
        this.toastr.success("Student restored successfully.");
        this.isChangingStudentState = false;
        this.student.state = "ACTIVE";
      }, err => {
        this.isChangingStudentState = false;
        this.toastr.error("Failed to restore record.");
      });
  }

  toggleView(property: string) {
    if (this[property] && (this[property] === true)) {
      this[property] = false;
    } else {
      this[property] = true;
    }
  }

  grantLeave(data) {
    data.student = this.id;
    this.isSavingLeave = true;
    this.studentService.grantLeave(data)
      .subscribe(res => {
        if (this.leaves) {
          this.leaves.unshift({ id: res.id, ...data });
        }
        this.isSavingLeave = false;
        this.toastr.success("Leave grant was successful.");
      }, err => {
        this.isSavingLeave = false;
        if (err.status === 409) return this.toastr.error(err.error.message);
        this.toastr.error("Failed to save leave grant.");
      });
  }

  getLeaves() {
    if (this.leaves) return;
    this.isGettingLeaves = true;
    this.studentService.getLeaves(this.id)
    .subscribe(res => {
      this.leaves = res;
      this.isGettingLeaves = false;
    }, err => {
      this.toastr.error("Failed to load leave outs.");
      this.isGettingLeaves = false;
    });
  }

  suspend(data) {
    this.isSavingSuspension = true;
    data.student = this.id;
    this.studentService.suspend(data)
      .subscribe(res => {
        if (this.suspensions) {
          this.suspensions.unshift({ id: res.id, ...data });
        }
        this.isSavingSuspension = false;
        this.toastr.success("Suspension saved successfully.");
      }, err => {
        this.isSavingSuspension = false;
        if (err.status === 409) return this.toastr.error(err.error.message);
        this.toastr.error("Failed to save suspension.");
      });
  }

  getSuspensions() {
    if (this.suspensions) return;
    this.isGettingSuspensions = true;
    this.studentService.getSuspensions(this.id)
    .subscribe(res => {
      this.suspensions = res;
      this.isGettingSuspensions = false;
    }, err => {
      this.toastr.error("Failed to load suspensions.");
      this.isGettingSuspensions = false;
    });
  }

  deleteLeave(id) {
    if (!window.confirm("Delete item?")) return;
    this.studentService.deleteLeave(id)
    .subscribe(res => {
      const index = this.leaves.indexOf(this.leaves.find(i => +i.id === +id));
      this.leaves.splice(index, 1);
    }, err => {
      this.toastr.error("Failed to delete item.");
    });
  }

  deleteSuspension(id) {
    if (!window.confirm("Delete item?")) return;
    this.studentService.deleteSuspension(id)
    .subscribe(res => {
      const index = this.suspensions.indexOf(this.suspensions.find(i => +i.id === +id));
      this.suspensions.splice(index, 1);
    }, err => {
      this.toastr.error("Failed to delete item.");
    });
  }

}
