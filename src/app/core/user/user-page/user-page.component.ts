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
  isUpdating: boolean = false;

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

}
