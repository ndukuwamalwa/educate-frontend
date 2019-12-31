import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ToastrService } from 'src/app/toastr.service';
import { EmployeeService } from '../employee.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { counties } from 'src/app/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnChanges {
  @Input('title') title: string = "Add employee";
  @Input('isLoading') isLoading: boolean = false;
  @Input('data') data: Employee;
  @Output('submitted') submitted: EventEmitter<Employee> = new EventEmitter();
  counties: string[] = counties;
  employeeForm = this.fb.group({
    empNo: ['', [Validators.required, Validators.pattern(/^[a-z0-9-/]+$/i)]],
    fname: ['', [Validators.required, Validators.pattern(/^[a-z']+$/i)]],
    mname: ['', [Validators.pattern(/^[a-z']*$/i)]],
    lname: ['', [Validators.required, Validators.pattern(/^[a-z']+$/i)]],
    dob: ['', [Validators.required]],
    joined: ['', [Validators.required]],
    county: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    idNo: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnChanges() {
    if (this.data) {
      this.employeeForm.setValue({
        empNo: this.data.empNo,
        fname: this.data.fname,
        mname: this.data.mname,
        lname: this.data.lname,
        dob: this.data.dob,
        joined: this.data.joined,
        county: this.data.county,
        gender: this.data.gender,
        idNo: this.data.idNo
      });
    }
  }

  save(data: Employee) {
    if (this.data) {
      this.submitted.emit(data);
      return;
    }
    this.isLoading = true;
    this.employeeService.add(data)
      .subscribe(res => {
        this.isLoading = false;
        this.toaster.success("Employee created successfully.");
        this.router.navigate(['employees', 'view', 'active']);
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toaster.error("Duplicate keys were found. Check Employee ID/ Employee No.");
        return this.toaster.error("Failed to add employee.");
      });
  }

}
