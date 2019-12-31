import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'src/app/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user-group',
  templateUrl: './add-user-group.component.html',
  styleUrls: ['./add-user-group.component.scss']
})
export class AddUserGroupComponent implements OnInit {

  tables: string[];
  grants: { table: string, operations: string[] }[] = [];
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getTables()
      .subscribe(res => {
        this.tables = res;
      }, e => {
        this.toastr.error("Failed to load entities");
      });
  }

  onGrantChange(inp: HTMLInputElement, table, op) {
    let grant = this.grants.find(t => t.table === table);
    if (inp.checked) {
      if (grant) {
        if (grant.operations) {
          grant.operations.push(op);
        } else {
          grant.operations = [op];
        }
      } else {
        this.grants.push({ table, operations: [op] });
      }
    } else {
      if (grant) {
        grant.operations.splice(grant.operations.indexOf(op), 1);
        if (grant.operations.length === 0) {
          this.grants.splice(this.grants.indexOf(grant), 1);
        }
      }
    }
  }

  addGroup({ name }) {
    this.isLoading = true;
    this.userService.addGroup({ name, tables: this.grants })
    .subscribe(res => {
      this.isLoading = false;
      this.toastr.success("User group added successfully.");
      this.router.navigate(['users', 'view', 'groups']);
    }, e => {
      this.isLoading = false;
      if (e.status === 409) return this.toastr.error("Group with the given name exists");
      this.toastr.error("Unable to add group.");
    });
  }

}
