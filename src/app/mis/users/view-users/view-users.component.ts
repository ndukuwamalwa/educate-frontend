import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { ToastrService } from 'src/app/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  users: User[];
  isLoading: boolean = false;
  total: number;
  sorts: { label: string, key: string }[] = [
    {
      label: "Name",
      key: "name"
    },
    {
      label: "Title",
      key: "title"
    },
    {
      label: "Username",
      key: "username"
    },
    {
      label: "Group",
      key: "groupName"
    }
  ];

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(options = {}) {
    this.isLoading = true;
    this.userService.list(options)
      .subscribe(res => {
        this.isLoading = false;
        this.total = res.total;
        this.users = res.items;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to get users.");
      });
  }

  onOptions(options) {
    this.getUsers(options);
  }

  viewUser(nodeName: string, user) {
    if (nodeName.toLowerCase() === "td") {
      const dialog = this.dialog.open(UserDetailsComponent, {
        width: "50%",
        height: "70%",
        data: user
      });
      dialog.afterClosed()
        .subscribe(u => {
          if (u) {
            this.users.splice(this.users.indexOf(user), 1, u);
          }
        });
    }
  }

  delete(id) {
    const confirm = this.dialog.open(ConfirmComponent, {
      width: "400px",
      height: "200px",
      data: "Delete this user from the system? Note that activity logs for this user will not be deleted."
    });
    confirm.afterClosed()
      .subscribe(res => {
        if (res) {
          this.userService.delete(id)
            .subscribe(res => {
              this.toastr.success("User deleted successfully.");
              this.users.splice(this.users.indexOf(this.users.find(u => +u.id === +id)), 1);
            }, e => {
              this.toastr.error("Failed to delete user.");
            });
        }
      });
  }

}
