import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { ToastrService } from 'src/app/toastr.service';
import { NgForm } from '@angular/forms';
import { ClassService } from '../../class/class.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  isSaving: boolean = false;
  subjects: any[];
  isGettingSubjects: boolean = false;
  classes: Class[];
  toRegister: any[] = [];
  selectedSubject: number;
  selectedClass: number;
  isLoadingStudents: boolean = false;
  studentsToRegister: any[];
  isRegistering: boolean = false;
  isLoadingRegister: boolean = false;
  registered: any[];

  constructor(
    private subjectService: SubjectService,
    private toastr: ToastrService,
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.classService.getClasses()
      .subscribe(res => {
        this.classes = res.items;
      }, err => {
        this.toastr.error("Failed to load classes");
      });
  }

  addSubject(form: NgForm) {
    this.isSaving = true;
    this.subjectService.add(form.value)
      .subscribe(res => {
        if (this.subjects) {
          this.subjects.push({ ...form.value, id: res.id });
        }
        this.isSaving = false;
        this.toastr.success("Subject added successfully.");
        form.reset();
      }, err => {
        this.isSaving = false;
        if (err.status === 409) return this.toastr.error("Subject already exists.");
        this.toastr.error("Failed to add subject.");
      });
  }

  getSubjects(force: boolean = false) {
    if (this.subjects && !force) return;
    this.isGettingSubjects = true;
    this.subjectService.getSubjects()
      .subscribe(res => {
        this.subjects = res.items;
        this.isGettingSubjects = false;
      }, err => {
        this.isGettingSubjects = false;
        this.toastr.error("Failed to get subjects.");
      });
  }

  delete(id) {
    const confirm = window.confirm("Are you sure you want to delete subject?");
    if (!confirm) return;
    this.subjectService.delete(id)
      .subscribe(res => {
        const subject = this.subjects.find(val => +val.id === +id);
        const index = this.subjects.indexOf(subject);
        this.subjects.splice(index, 1);
        this.toastr.success("Subject deleted successfully.");
      }, err => {
        this.toastr.error("Failed to delete subject.");
      });
  }

  loadForRegistration({ subject, clas }) {
    this.selectedClass = +clas;
    this.selectedSubject = +subject;
    this.isLoadingStudents = true;
    this.subjectService.getNotRegistered(subject, clas)
      .subscribe(res => {
        this.studentsToRegister = res;
        this.isLoadingStudents = false;
      }, err => {
        this.isLoadingStudents = false;
        this.toastr.error("Failed to load students.");
      });
  }

  register() {
    this.isRegistering = true;
    this.subjectService.registerBulk(this.toRegister)
      .subscribe(res => {
        this.toastr.success("Registration completed successfully.");
        this.isRegistering = false;
        this.toRegister = [];
      }, err => {
        this.isRegistering = false;
        if (err.status === 409) return this.toastr.error("Students have already been registered.");
        this.toastr.error("Failed to register students for the subject.");
      });
  }

  onRegisterAllChange(inp: HTMLInputElement) {
    const items = document.getElementsByClassName("items-to-register");
    if (inp.checked) {
      for (let i = 0; i < items.length; i++) {
        let elem = items[i] as HTMLInputElement;
        elem.checked = true;
        this.onSelectionChange(elem);
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        let elem = items[i] as HTMLInputElement;
        elem.checked = false;
      }
      this.toRegister = [];
    }
  }

  onSelectionChange(elem: HTMLInputElement) {
    if (elem.checked) {
      if (!this.toRegister.find(val => +val.student === +elem.value)) {
        this.toRegister.push({ student: +elem.value, subject: this.selectedSubject, class: this.selectedClass });
      }
    } else {
      const item = this.toRegister.find(i => +i.student === +elem.value);
      this.toRegister.splice(this.toRegister.indexOf(item), 1);
    }
  }

  loadRegister({ subject, clas }) {
    this.isLoadingRegister = true;
    this.subjectService.getRegisteredStudents(subject, clas)
      .subscribe(res => {
        this.registered = res;
        this.isLoadingRegister = false;
      }, err => {
        this.isLoadingRegister = false;
        this.toastr.error("Failed to load registered students.");
      });
  }

  deregister(id) {
    if (!confirm("Delete registration?")) return;
    this.subjectService.deregister(id)
      .subscribe(res => {
        const index = this.registered.indexOf(this.registered.find(i => +i.id === +id));
        this.registered.splice(index, 1);
      }, err => {
        this.toastr.error("Failed to deregister student.");
      });
  }

}