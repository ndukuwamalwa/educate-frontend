import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  isSaving: boolean = false;
  subjects: any[];
  isGettingSubjects: boolean = false;

  constructor(
    private subjectService: SubjectService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  addSubject(name) {
    this.isSaving = true;
    this.subjectService.add(name)
      .subscribe(res => {
        if (this.subjects) {
          this.subjects.push({ name, id: res.id });
        }
        this.isSaving = false;
        this.toastr.success("Subject added successfully.");
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

}
