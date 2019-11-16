import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/app/constants';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggingIn: boolean = false;
  invalid: boolean = false;
  changePassword: boolean = false;
  isChangingPassword: boolean = false;
  username: string;
  password: string;
  passwordProblems: boolean = false;
  message: string;
  userId: string;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login(credentials) {
    this.isLoggingIn = true;
    credentials.password = credentials.password.trim();
    this.username = credentials.username;
    this.password = credentials.password;
    this.http.post(`${API}/login`, credentials)
      .subscribe(res => {
        const resp = res as any;
        if (resp.action && resp.action === "change_password") {
          this.changePassword = true;
          this.userId = resp.id;
          return;
        }
        window.sessionStorage.setItem('token', resp.token);
        this.proceedLogin(resp.token);
        this.isLoggingIn = false;
      }, err => {
        this.invalid = true;
        this.isLoggingIn = false;
      });
  }

  removeError() {
    this.invalid = false;
  }

  proceedLogin(token) {
    //Just be sure that the token is set
    if (!window.sessionStorage.getItem('token')) {
      window.sessionStorage.setItem('token', token);
    }
    this.router.navigate(['students']);
  }

  onChangePassword(data) {
    if (data.password !== data.confirm) {
      this.message = `Passwords do not match`;
      return;
    }
    this.isChangingPassword = true;
    this.http.post(`${API}/login?changePass=true&user=${this.userId}`, data)
      .subscribe(res => {
        const resp = res as any;
        if (resp.action && resp.action === "change_password") {
          this.changePassword = true;
          this.userId = resp.id;
        }
        this.isChangingPassword = false;
        window.sessionStorage.setItem('token', resp.token);
        this.proceedLogin(resp.token);
      }, err => {
        this.isChangingPassword = false;
      });
  }

  checkNewPassword(password: string) {
    password = password.trim();
    if (password.toLowerCase() === this.password.toLowerCase()) {
      this.passwordProblems = true;
      this.message = `You cannot use the default password.`;
      return;
    }
    if (password.length < 8) {
      this.passwordProblems = true;
      this.message = `Password too short.`;
      return;
    }
    if (!(/[a-z]{1,}/.test(password))) {
      this.passwordProblems = true;
      this.message = `Password must contain atleast one lowercase letter.`;
      return;
    }
    if (!(/[A-Z]{1,}/.test(password))) {
      this.passwordProblems = true;
      this.message = `Password must contain atleast one uppercase letter.`;
      return;
    }
    if (!(/[0-9]/.test(password))) {
      this.passwordProblems = true;
      this.message = `Password must have atleast one numeric value`;
      return;
    }
    this.passwordProblems = false;
  }

  onConfirming(confirm: string, password: string) {
    if (password.trim().length === 0) {
      this.passwordProblems = true;
      this.message = `Enter password first.`;
      return;
    }
    if (password !== confirm) {
      this.passwordProblems = true;
      this.message = `Passwords do not match.`;
      return;
    }
    this.passwordProblems = false;
  }

}
