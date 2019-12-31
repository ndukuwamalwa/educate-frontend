import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'src/app/toastr.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.scss']
})
export class EmployeesViewComponent implements OnInit {

  @Input('type') type: string;
  isLoading: boolean = false;
  total: number;
  employees: Employee[];
  columns: { label: string, key: string }[] = [
    {
      label: "Employee No.",
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
      label: "Date of Birth",
      key: 'dob'
    },
    {
      label: "ID No.",
      key: "idNo"
    },
    {
      label: "County",
      key: "county"
    },
    {
      label: "Joined",
      key: "joined"
    }
  ];

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(options = {}) {
    this.isLoading = true;
    this.employeeService[this.type](options)
      .subscribe(res => {
        this.employees = res.items;
        this.total = res.total;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to get employees");
      });
  }

  onOptions(options) {
    this.getEmployees(options);
  }

  onClicked(employee: Employee) {
    const dialog = this.dialog.open(EmployeeDetailComponent, {
      width: "80%",
      height: "80%",
      data: employee
    });
    dialog.afterClosed()
      .subscribe(emp => {
        if (emp) {
          this.employees.splice(this.employees.indexOf(employee), 1, emp);
        }
      });
  }

}
