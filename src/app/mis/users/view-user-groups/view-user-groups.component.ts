import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'src/app/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { GroupDetailsComponent } from '../group-details/group-details.component';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-view-user-groups',
  templateUrl: './view-user-groups.component.html',
  styleUrls: ['./view-user-groups.component.scss']
})
export class ViewUserGroupsComponent implements OnInit {
  groups: any[];
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userService.listGroups()
      .subscribe(res => {
        this.groups = res.items;
      });
  }

  viewGroup(nodeName: string, group) {
    if (nodeName.toLowerCase() !== "td") return;
    const dia = this.dialog.open(GroupDetailsComponent, {
      width: "auto",
      height: "auto",
      data: group
    });
    dia.afterClosed()
      .subscribe(g => {
        if (g) {
          this.groups.splice(this.groups.indexOf(group), 1, g);
        }
      });
  }

  delete(id) {
    const confirm = this.dialog.open(ConfirmComponent, {
      width: "auto",
      height: "auto",
      data: "Delete user group?"
    });
    confirm.afterClosed()
      .subscribe(r => {
        if (r) {
          this.userService.deleteGroup(id)
            .subscribe(res => {
              this.toastr.success("User group deleted successfully.");
            }, e => {
              if (e.status === 409) return this.toastr.error("Cannot delete a group that has users.");
              return this.toastr.error("Failed to delete group.");
            });
        }
      });
  }

}
