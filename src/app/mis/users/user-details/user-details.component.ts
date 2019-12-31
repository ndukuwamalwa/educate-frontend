import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  isUpdating: boolean = false;
  isLoading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  update(user) {
    this.isUpdating = true;
    this.userService.update(user, this.user.id)
      .subscribe(res => {
        this.isUpdating = false;
        this.toastr.success("Updated user details successfully.");
        this.user = { ...this.user, ...user };
      }, e => {
        this.isUpdating = false;
        if (e.status === 409) return this.toastr.error("Username has already been used.");
        this.toastr.error("Failed to update user details");
      });
  }

}
