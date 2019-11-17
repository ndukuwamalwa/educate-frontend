import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { back } from 'src/app/utilities';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  user: User;
  id: string;
  back = back;
  isGettingBasicDetails: boolean = false;
  isGettingModules: boolean = false;
  isSavingPermissions: boolean = false;
  isUpdating: boolean = false;
  modules: any[];
  selectedPermissions: any[] = [];
  sections: { title: string, table: string, create?: string, update?: string, delete?: string, select?: string }[] = [
    {
      title: 'Students',
      table: 'student'
    },
    {
      title: 'Student contacts',
      table: 'student_contact'
    },
    {
      title: 'Student attendance',
      table: 'student_attendance'
    },
    {
      title: 'Academic calendar',
      table: 'academic_year'
    },
    {
      title: 'Classes',
      table: 'batch'
    },
    {
      title: 'Student classes',
      table: 'student_batch'
    },
    {
      title: 'Student charges',
      table: 'student_charge'
    },
    {
      title: 'Subjects',
      table: 'subject'
    },
    {
      title: 'Subject registration',
      table: 'student_subject'
    },
    {
      title: 'Exams',
      table: 'exam'
    },
    {
      title: 'Exam results',
      table: 'exam_result'
    },
    {
      title: 'Fee payments',
      table: 'fee_payment'
    },
    {
      title: 'Employees',
      table: 'employee'
    },
    {
      title: 'Employee salaries',
      table: 'salaried'
    },
    {
      title: 'Teachers',
      table: 'teacher'
    },
    {
      title: 'Teacher roles',
      table: 'teacher_role'
    },
    {
      title: 'Hostels',
      table: 'hostel'
    },
    {
      title: 'Hostel allocation',
      table: 'student_hostel'
    },
    {
      title: 'SMS Messaging',
      table: 'sms'
    }
  ];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const id = params.id;
        this.isGettingBasicDetails = true;
        this.userService.getUser(id)
          .subscribe(res => {
            this.user = res;
            this.id = res.id;
            this.isGettingBasicDetails = false;
          });
      });
  }

  updateUser(values) {
    this.isUpdating = true;
    values.id = this.id;
    this.userService.updateUser(values)
      .subscribe(res => {
        for (let item of Object.keys(values)) {
          this.user[item] = values[item];
        }
        this.isUpdating = false;
        this.toastr.success("User updated successfully.");
      }, err => {
        this.isUpdating = false;
        this.toastr.error("Failed to update user.");
      });
  }

  getModules() {
    this.isGettingModules = true;
    this.userService.getModules(this.id)
      .subscribe(res => {
        this.isGettingModules = false;
        this.modules = res;
        for (let mod of this.modules) {
          let item = this.sections.find(val => val.table.toLowerCase() === mod.document.toLowerCase());
          if (item) {
            switch (mod.operation.toLowerCase()) {
              case 'create': {
                item.create = 'CREATE';
                break;
              }
              case 'update': {
                item.update = 'UPDATE';
                break;
              }
              case 'delete': {
                item.delete = 'DELETE';
                break;
              }
              case 'select': {
                item.select = 'SELECT';
                break;
              }
            }
          }
        }
      }, err => {
        this.isGettingModules = false;
        this.toastr.error("Unable to get the modules this user can acccess.");
      });
  }

  addModules(value) {
    if (this.selectedPermissions.length === 0) return;
    this.isSavingPermissions = true;
    const filtered = this.selectedPermissions.filter(item => {
      const existed = this.modules.find(p => {
        const tableExisted = p.document.toLowerCase() === item.document.toLowerCase();
        const operationExisted = p.operation.toLowerCase() === item.operation.toLowerCase();
        const actionIsRemove = item.action.toLowerCase() === 'remove';
        return (tableExisted && operationExisted) && !actionIsRemove;
      });
      if (existed) return false;
      return true;
    });
    this.userService.savePermissions(filtered)
      .subscribe(res => {
        this.isSavingPermissions = false;
        this.toastr.success("Permissions saved successfully.");
        this.getModules();
      }, err => {
        this.isSavingPermissions = false;
        this.toastr.error("Problem saving permissions");
      });
  }

  onPermChange(table: string, target: HTMLInputElement) {
    const item = this.selectedPermissions.find(val => (val.document === table) && (val.operation === target.value));
    if (target.checked) {
      if (item) {
        this.selectedPermissions.splice(this.selectedPermissions.indexOf(item), 1);
      }

      this.selectedPermissions.push({ user: this.id, document: table, operation: target.value, action: 'add' });
    } else {
      if (item) {
        this.selectedPermissions.splice(this.selectedPermissions.indexOf(item), 1);
      } else {
        this.selectedPermissions.push({ user: this.id, document: table, operation: target.value, action: 'remove' });
      }
    }
  }

}
