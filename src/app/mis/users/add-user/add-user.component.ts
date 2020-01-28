import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { ToastrService } from 'src/app/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnChanges, OnInit {
  @Input('title') title: string = "Add system user";
  @Input('data') data: any;
  @Input('isLoading') isLoading: boolean = false;
  @Output('submitted') submitted: EventEmitter<User> = new EventEmitter();
  groups: any[];
  userForm = this.fb.group({
    empNo: ['', [
      Validators.required
    ]],
    username: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [Validators.required]],
    type: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnChanges() {
    if (this.data) {
      this.userForm.removeControl('password');
      this.userForm.controls.empNo.disable;
      this.userForm.setValue({
        empNo: this.data.empNo,
        username: this.data.username,
        type: this.data.type
      });
    }
  }

  ngOnInit() {
  }

  save(data: User) {
    if (this.data) {
      this.submitted.emit(data);
      return;
    }
    this.isLoading = true;
    this.userService.add(data)
      .subscribe(res => {
        this.toastr.success("User added successfully.");
        this.isLoading = false;
        this.router.navigate(['users', 'view', 'users']);
      }, e => {
        this.isLoading = false;
        if (e.error.message.startsWith("Cannot add or update a child row")) {
          return this.toastr.error("Invalid employee number");
        }
        if (e.status === 409) return this.toastr.error("Username has alreday been used.");
        return this.toastr.error("Failed to add user.");
      });
  }

}
