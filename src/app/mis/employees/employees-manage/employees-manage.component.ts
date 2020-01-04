import { Component, Input, OnChanges } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'src/app/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { Subscribable } from 'rxjs';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-employees-manage',
  templateUrl: './employees-manage.component.html',
  styleUrls: ['./employees-manage.component.scss']
})
export class EmployeesManageComponent implements OnChanges {
  @Input('action') action: string;
  isLoading: boolean = false;
  isCommiting: boolean = false;
  employees: Employee[];
  total: number;
  toLoad: string;
  selectedEmployees: number[] = [];
  colums: { label: string, key: string }[] = [
    {
      label: "Emp No.",
      key: 'empNo'
    },
    {
      label: "First name",
      key: "fname"
    },
    {
      label: "Last name",
      key: "lname"
    },
    {
      label: "Gender",
      key: "gender"
    },
    {
      label: "ID No.",
      key: "idNo"
    }
  ];

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnChanges() {
    if (this.action) {
      this.getEmployees();
    }
  }

  getEmployees(options = {}) {
    this.isLoading = true;
    let subscribable: Subscribable<any>;
    if (this.action === "transfer" || this.action === "retire" || this.toLoad === "active") {
      subscribable = this.employeeService.active(options);
    } else {
      if (this.toLoad === "transfered") {
        subscribable = this.employeeService.transfered(options);
      } else {
        subscribable = this.employeeService.retired(options);
      }
    }
    subscribable
      .subscribe(res => {
        this.isLoading = false;
        this.total = res.total;
        this.employees = res.items;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load employees.");
      });
  }

  onTypeChange(type: string) {
    this.toLoad = type.toLowerCase();
    this.getEmployees();
  }

  onOptions(options) {
    this.getEmployees(options);
  }

  check(id: number) {
    const index = this.selectedEmployees.indexOf(+id);
    if (index < 0) {
      this.selectedEmployees.push(+id);
    } else {
      this.selectedEmployees.splice(index, 1);
    }
  }

  commit() {
    const confirm = this.dialog.open(ConfirmComponent, {
      width: "auto",
      height: "auto",
      data: `Proceed with this operation?`
    });
    confirm.afterClosed()
      .subscribe(r => {
        if (r) {
          this.isCommiting = true;
          let subscribable: Subscribable<any>;
          if (this.action === "delete") {
            subscribable = this.employeeService.delete(this.selectedEmployees);
          } else if (this.action === "retire") {
            subscribable = this.employeeService.retire(this.selectedEmployees);
          } else if (this.action === "restore") {
            subscribable = this.employeeService.restore(this.selectedEmployees);
          } else {
            subscribable = this.employeeService.transfer(this.selectedEmployees);
          }
          subscribable.subscribe(res => {
            this.toastr.success("Action applied successfully.");
            this.selectedEmployees = [];
            this.getEmployees();
            this.isCommiting = false;
          }, e => {
            this.isCommiting = false;
            this.toastr.error("The action could not be completed. Please retry.");
          });
        }
      });
  }

}
