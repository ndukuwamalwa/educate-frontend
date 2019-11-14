import { Component, OnInit, OnChanges } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpResponse } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/toastr.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { PRINT } from 'src/app/constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userSorts: string[] = ['id', 'name', 'username', 'title'];
  totalUsers: number;
  users: User[];
  isSaving: boolean = false;
  isGettingUsers: boolean = false;
  printUrl: SafeResourceUrl

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

  }

  addUser(data: User) {
    this.isSaving = true;
    data.username = data.username.toLowerCase();
    this.userService.addUser(data)
      .subscribe(res => {
        this.router.navigate(['users', res.id]);
        this.toastr.success("User added successfully.");
        this.isSaving = false;
      }, err => {
        this.isSaving = false;
        if (err.status === 409) {
          return this.toastr.error("Username has already been used.");
        }
        this.toastr.error("Failed to create user.");
      });
  }

  viewDetails(id) {
    this.router.navigate(['users', id]);
  }

  onViewUsers() {
    if (this.users) {
      return;
    }
    const options = {
      size: 80,
      page: 1,
      sort: -1,
      sortBy: 'name'
    };
    this.getUsers(options);
  }

  getUsers(options) {
    this.isGettingUsers = true;
    this.userService.getUsers(options)
      .subscribe(res => {
        this.totalUsers = +res.total;
        this.users = res.items;
        this.isGettingUsers = false;
      }, err => {
        this.isGettingUsers = false;
      });
  }

  onListViewOptions(options) {
    this.getUsers(options);
  }

  print(category: string) {
    this.printUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${PRINT}/users?${category}=true`);
  }

}
