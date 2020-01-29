import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { counties } from 'src/app/constants';
import { Validators, FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html'
})
export class StudentFormComponent implements OnInit, OnChanges {
  @Input('title') title: string;
  @Input('data') data: Student;
  @Input('isLoading') isLoading: boolean = false;
  @Output('onSubmit') onSubmit: EventEmitter<FormGroup> = new EventEmitter();

  counties = counties;
  studentForm = this.fb.group({
    adm: ['', [
      Validators.required,
      Validators.pattern(/^[a-z0-9-/]+$/i)
    ]],
    admitted: ['', [
      Validators.required
    ]],
    fname: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z']+$/i)
    ]],
    mname: ['', [
      Validators.pattern(/^[a-zA-Z ']+$/i)
    ]],
    lname: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z']+$/i)
    ]],
    dob: ['', [
      Validators.required
    ]],
    gender: ['', [
      Validators.required
    ]],
    county: ['', [
      Validators.required
    ]],
    fatherName: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ']+$/i)
    ]],
    motherName: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ']+$/i)
    ]],
    guardianName: ['', [
      Validators.pattern(/^[a-zA-Z ']+$/i)
    ]],
    homeContact: ['', [
      Validators.required,
      Validators.pattern(/^07[0-9]{8}$/)
    ]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {  }

  ngOnChanges() {
    if (this.data && Object.keys(this.data).length > 0) {
      const keys = Object.keys(this.studentForm.controls);
      const value = {};
      for (let key of Object.keys(this.data)) {
        if (keys.includes(key)) {
          value[key] = this.data[key];
        }
      }
      this.studentForm.setValue(value);
    }
  }

  submit(form: FormGroup) {
    this.onSubmit.emit(form);
  }

}
