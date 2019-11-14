import { Component, OnInit } from '@angular/core';
import { HrService } from '../hr.service';
import { ToastrService } from 'src/app/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { counties } from 'src/app/constants';
import { back } from 'src/app/utilities';

@Component({
  selector: 'app-hr-page',
  templateUrl: './hr-page.component.html',
  styleUrls: ['./hr-page.component.scss']
})
export class HrPageComponent implements OnInit {
  isGettingBasicDetails: boolean = false;
  employee: any;
  id: string | number;
  isUpdatingEmployee: boolean = false;
  isSavingSalary: boolean = false;
  counties: string[] = counties;
  salary: any;
  back = back;
  isDeleting: boolean = false;

  constructor(
    private hrService: HrService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.isGettingBasicDetails = true;
      this.hrService.getEmployee(this.id)
        .subscribe(res => {
          this.employee = res;
          this.isGettingBasicDetails = false;
        }, err => {
          this.isGettingBasicDetails = false;
          this.toastr.error("Failed to load employee details.");
        });
    });
  }

  update({ value }) {
    value.id = this.id;
    this.isUpdatingEmployee = true;
    this.hrService.updateEmployee(value)
      .subscribe(res => {
        this.isUpdatingEmployee = false;
        this.employee = { ...this.employee, ...value };
        this.toastr.success('Details updated successfully.');
      }, err => {
        this.isUpdatingEmployee = false;
        this.toastr.error("Update failed. Check details and try again.");
      });
  }

  getSalary(force: boolean = false) {
    if (this.salary && !force) return;
    this.hrService.getSalary(this.id)
      .subscribe(res => {
        if (res.length > 0) {
          this.salary = res[0];
        } else {
          this.salary = {};
        }
      }, err => {
        this.toastr.error("Failed to get salary details.");
      });
  }

  saveSalary({ value }) {
    value = { ...this.salary, ...value };
    this.isSavingSalary = true;
    value.employee = this.id;
    this.hrService.saveSalary(value)
      .subscribe(res => {
        this.isSavingSalary = false;
        this.salary = { ...this.salary, ...value };
        this.toastr.success("Salary details saved successfully.");
      }, err => {
        this.isSavingSalary = false;
        this.toastr.error("Failed to save salary details.");
      });
  }

  delete(id) {
    const confirm = window.confirm("Are you sure you want to delete this employee?");
    if (!confirm) return;
    this.isDeleting = true;
    this.hrService.delete(id)
    .subscribe(res => {
      this.isDeleting = false;
      this.toastr.success("Employee deleted successfully.");
      this.router.navigate(['hr']);
    }, err => {
      this.toastr.error("Failed to delete employee.");
      this.isDeleting = false;
    });
  }

}
