import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  shouldChangePassword: boolean = false;
  invalidPassMessage: string;
  invalidCredentials: string;
  token: string;
  userId: number;
  jwtHelper = new JwtHelperService();
  isLoading: boolean = false;
  loginForm = this.fb.group({
    username: ['admin', [Validators.required]],
    password: ['Admin#2019', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    const token = this.auth.token;
    if (token && !this.auth.isTokenExpired()) {
      this.goTo();
    }
  }

  goTo() {
    const whereTo = window.sessionStorage.getItem("next_url");
    if (whereTo) {
      return this.router.navigateByUrl(whereTo);
    }
    this.router.navigate(['dashboard']);
  }

  login({ username, password }) {
    this.isLoading = true;
    this.auth.authenticate(username, password)
      .subscribe(res => {
        this.isLoading = false;
        if (res.changePassword) {
          this.shouldChangePassword = true;
          this.token = res.token;
          const user = this.jwtHelper.decodeToken(this.token);
          this.userId = user.id;
          return;
        }
        this.auth.setToken(res.token)
          .then(r => {
            this.goTo();
          });
      }, e => {
        this.isLoading = false;
        if (e.status === 401) {
          this.invalidCredentials = "Login credentials did not match any user.";
        } else if (e.status === 0) {
          this.invalidCredentials = "You are not connected to the Internet. Connect and try again";
        } else if (e.status === 500) {
          this.invalidCredentials = "A server problem was encountered. Please retry.";
        } else {
          this.invalidCredentials = "Cannot login at this time. Please try again later.";
        }
      });
  }

  changePassword({ password, confirm }) {
    if (password !== confirm) {
      this.invalidPassMessage = "Passwords do not match";
      return;
    }
    this.isLoading = true;
    this.auth.changePassword(password, this.userId)
      .subscribe(res => {
        this.auth.setToken(this.token)
          .then(r => {
            this.goTo();
          });
        this.isLoading = false;
      }, e => {
        this.invalidCredentials = "Failed to change your password. Please refresh page and retry.";
        this.isLoading = false;
      });
  }

  onChangePass(inp: HTMLInputElement) {
    const password: string = inp.value;
    if (password.length < 8) {
      this.invalidPassMessage = "Password must be at least 8 characters long.";
    } else if (!(/[a-z]+/.test(password))) {
      this.invalidPassMessage = "Password must contain at least a lowercase letter a-z.";
    } else if (!(/[A-Z]+/.test(password))) {
      this.invalidPassMessage = "Password must contain at least a uppercase letter A-Z.";
    } else if (!(/[0-9]/.test(password))) {
      this.invalidPassMessage = "Password must contain at least a numerical value 0-9."
    } else if (!(/[!@#$%^&*(-)+,.?:;</>|]/.test(password))) {
      this.invalidPassMessage = "Password must contain at least one of the special characters !@#$%^&*(-)+,.?:;</>|";
    } else {
      this.invalidPassMessage = undefined;
    }
  }

  onConfirmPass(inp: HTMLInputElement, password) {
    if (password !== inp.value) {
      this.invalidPassMessage = "Passwords do not match";
    } else {
      this.invalidPassMessage = undefined;
    }
  }

  onFocus() {
    this.invalidCredentials = undefined;
  }

}
