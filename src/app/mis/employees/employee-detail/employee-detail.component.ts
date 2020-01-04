import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { ToastrService } from 'src/app/toastr.service';
import { EmployeeService } from '../employee.service';
import { EmployeeBank } from 'src/app/models/employee-bank-details.model';
import { Subscribable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  isLoading: boolean = false;
  contacts: any[];
  bankDetails: EmployeeBank;
  isSavingBank: boolean = false;
  isSavingContact: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public employee: Employee,
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.employeeService.bankDetails(this.employee.id)
      .subscribe(res => {
        this.bankDetails = res;
      }, e => {
        this.toastr.error("Failed to load bank details.");
      });
    this.employeeService.employeeContacts(this.employee.id)
      .subscribe(res => {
        this.contacts = res;
      }, e => {
        this.toastr.error("Failed to load contacts.");
      });
  }

  update(emp: Employee) {
    this.isLoading = true;
    this.employeeService.update(emp, this.employee.id)
      .subscribe(res => {
        this.isLoading = false;
        this.employee = { ...this.employee, ...emp };
        this.toastr.success("Employee details updated successfully.");
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Employee no/ID number matches another employee record.");
        return this.toastr.error("Failed to update employee details");
      });
  }

  setBankDetails(details: EmployeeBank) {
    this.isSavingBank = true;
    let subscribable: Subscribable<any>;
    if (Object.keys(this.bankDetails).length > 0) {
      subscribable = this.employeeService.updateBankDetails(details, this.bankDetails.id);
    } else {
      details.employee = this.employee.id;
      subscribable = this.employeeService.addBankDetails(details);
    }
    subscribable.subscribe(res => {
      this.isSavingBank = false;
      this.toastr.success("Bank details saved successfully.");
      if (res && res.id) {
        details.id = res.id;
      }
      this.bankDetails = { ...this.bankDetails, ...details };
    }, e => {
      this.isSavingBank = false;
      if (e.status === 409) return this.toastr.error("KRA PIN/Acc has already been used.");
      return this.toastr.error("Failed to save bank details.");
    });
  }

  addContact(form: NgForm) {
    const data = form.value;
    data.employee = this.employee.id;
    this.isSavingContact = true;
    this.employeeService.addContact(data)
      .subscribe(res => {
        this.isSavingContact = false;
        this.toastr.success("Contact added successfully.");
        if (this.contacts) {
          this.contacts.push({ id: res.id, ...data });
        } else {
          this.contacts = [{ id: res.id, ...data }];
        }
        form.reset();
      }, e => {
        this.isSavingContact = false;
        if (e.status === 409) return this.toastr.error("Contact exists");
        return this.toastr.error("Failed to save contact.");
      });
  }

  deleteContact(contact) {
    const conf = this.dialog.open(ConfirmComponent, {
      width: "auto",
      height: "auto",
      data: "Delete contact?"
    });
    conf.afterClosed()
      .subscribe(r => {
        if (r) {
          this.employeeService.deleteContact(contact.id)
            .subscribe(res => {
              this.contacts.splice(this.contacts.indexOf(contact), 1);
              this.toastr.success("Contact deleted successfully.");
            }, e => {
              this.toastr.error("Failed to delete contact.");
            });
        }
      });
  }

}
