import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../user/user.service';
import { ToastrService } from 'src/app/toastr.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  updateMode: boolean = false;
  isUpdating: boolean = false;
  user: User;
  isUpdatingPassword: boolean = false;
  jwtHelper = new JwtHelperService();

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.user = this.jwtHelper.decodeToken(window.sessionStorage.getItem('token'));
  }

  changeMode() {
    this.updateMode = !this.updateMode;
  }

  updateDetails(value) {
    this.isUpdating = true;
    const user: User = {
      id: this.user.id,
      name: value.name,
      username: value.username,
      title: this.user.title,
      type: this.user.type,
      state: this.user.state
    };
    this.userService.updateUser(user)
      .subscribe(res => {
        this.user.name = value.name;
        this.user.username = value.username;
        this.toastr.success("User updated successfully.");
        this.isUpdating = false;
        this.updateMode = false;
      }, err => {
        this.isUpdating = false;
        if (err.status === 409) return this.toastr.error("Username already exists.");
        this.toastr.error("Failed to update details");
      })
  }

  changePassword(data) {
    this.isUpdatingPassword = true;
    data.id = 150;
    this.userService.changePassword(data)
      .subscribe(res => {
        this.toastr.success("Password updated successfully.");
        this.isUpdatingPassword = false;
      }, err => {
        this.toastr.error("Failed to update password.");
        this.isUpdatingPassword = false;
      });
  }

}
