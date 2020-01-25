import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from '../subject.service';
import { ToastrService } from 'src/app/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnChanges {
  @Input('isLoading') isLoading: boolean = false;
  @Input('title') title: string = "Add subject";
  @Input('data') data: Subject;
  @Output('submitted') submitted: EventEmitter<Subject> = new EventEmitter();
  subjectForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-z ]+$/i)]],
    code: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+$/i)]],
    initials: ['', [Validators.required, Validators.pattern(/^[a-z]+$/i), Validators.minLength(3), Validators.maxLength(3)]],
    core: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnChanges() {
    if (this.data) {
      this.subjectForm.setValue({
        name: this.data.name,
        code: this.data.code,
        initials: this.data.initials,
        core: this.data.core.toString()
      });
    }
  }

  save(subject: Subject) {
    if (this.data) {
      this.submitted.emit(subject);
      return;
    }
    this.isLoading = true;
    this.subjectService.add(subject)
      .subscribe(res => {
        this.toastr.success("Subject added successfully.");
        this.router.navigate(['subjects', 'view', 'list']);
        this.subjectService.fetchSubjects = null;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Subject already exists.");
        return this.toastr.error("Failed to add subject.");
      });
  }

}
