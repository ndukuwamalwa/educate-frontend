import { Component, OnInit } from '@angular/core';
import { HrService } from '../hr.service';
import { ToastrService } from 'src/app/toastr.service';
import { Router } from '@angular/router';
import { counties } from 'src/app/constants';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { printUrlWithToken } from 'src/app/utilities';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.scss']
})
export class HrComponent implements OnInit {
  isAddingEmployee: boolean = false;
  counties: string[] = counties;
  isGettingEmployees: boolean = false;
  employees: any[];
  total: number;
  printUrl: SafeResourceUrl;

  constructor(
    private hrService: HrService,
    private toastr: ToastrService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  addEmployee(formData: FormData) {
    this.isAddingEmployee = true;
    this.hrService.addEmployee(formData)
      .subscribe(res => {
        this.toastr.success("Employee addded successfully.");
        this.isAddingEmployee = false;
        this.router.navigate(['hr', res.id]);
        this.getEmployees({}, true);
      }, err => {
        this.isAddingEmployee = false;
        if ((err.status === 409) || (err.status === 422)) return this.toastr.error(err.error.message);
        this.toastr.error("Failed to add employee.");
      });
  }

  getEmployees(options = {}, force: boolean = false) {
    if (this.employees && !force) return;
    this.isGettingEmployees = true;
    this.hrService.getEmployees(options)
      .subscribe(res => {
        this.total = res.total;
        this.employees = res.items;
        this.isGettingEmployees = false;
      }, err => {
        this.isGettingEmployees = false;
        this.toastr.error("Failed to get employees.");
      });
  }

  onOptionsChange(options) {
    this.getEmployees(options, true);
  }

  viewDetails(id) {
    this.router.navigate(['hr', id]);
  }

  print() {
    if (this.printUrl) return;
    this.printUrl = this.sanitizer.bypassSecurityTrustResourceUrl(printUrlWithToken(`/employees`));
  }

}
