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
  sections: { title: string, table: string, create?: string, update?: string, delete?: string, select?: string }[];

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
    this.getTables();
  }

  getTables() {
    this.userService.getTables()
      .subscribe(res => {
        res = res.map((t: string) => {
          let section = { table: '', title: '' };
          section.table = t.toLowerCase();
          section.title = t.replace("_", " ");
          return section;
        });
        this.sections = res;
      }, e => {
        this.toastr.error("Failed to get database documents.");
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
