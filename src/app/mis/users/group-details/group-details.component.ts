import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ToastrService } from 'src/app/toastr.service';
import { UserService } from '../user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  users: User[];
  isLoading: boolean = false;
  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public group: any
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.userService.groupUsers(this.group.id)
    .subscribe(res => {
      this.isLoading = false;
      this.users = res;
    }, e => {
      this.isLoading = false;
      this.toastr.error("Failed to get group users.");
    });
  }

}
