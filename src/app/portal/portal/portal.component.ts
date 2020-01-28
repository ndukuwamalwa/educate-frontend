import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { attendanceLinks } from 'src/app/mis/attendance/links';
import { classLinks } from 'src/app/mis/classes/links';
import { employeeLinks } from 'src/app/mis/employees/links';
import { examLinks } from 'src/app/mis/exams/links';
import { feeLinks } from 'src/app/mis/fees/links';
import { hostelLinks } from 'src/app/mis/hostels/links';
import { paymentLinks } from 'src/app/mis/payments/links';
import { setupLinks } from 'src/app/mis/setup/links';
import { smsLinks } from 'src/app/mis/sms/links';
import { studentLinks } from 'src/app/mis/students/links';
import { subjectLinks } from 'src/app/mis/subjects/links';
import { teacherLinks } from 'src/app/mis/teachers/links';
import { userLinks } from 'src/app/mis/users/links';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  menuShown: boolean = false;
  user: any;
  attendanceModule = attendanceLinks();
  classModule = classLinks();
  employeeModule = employeeLinks();
  examModule = examLinks();
  feeModule = feeLinks();
  hostelModule = hostelLinks();
  paymentModule = paymentLinks();
  setupModule = setupLinks();
  smsModule = smsLinks();
  studentModule = studentLinks();
  subjectModule = subjectLinks();
  teacherModule = teacherLinks();
  userModule = userLinks();

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    const desktopWidth = 1050;
    const width = window.innerWidth;
    if (width > desktopWidth) {
      this.menuShown = true;
    }
    window.addEventListener("resize", e => {
      const w = (e.target as any).innerWidth;
      if (w > desktopWidth && this.menuShown === false) {
        this.menuShown = true;
      } else {
        if (!this.menuShown) {
          this.menuShown = false;
        }
      }
    });
    this.user = this.auth.getUserDetails();
    this.user.type = this.user.type.toLowerCase();
  }

  toggleMenu() {
    this.menuShown = !this.menuShown;
  }

  logout() {
    this.auth.logout()
    .then(o => {
      this.router.navigate(['']);
    });
  }

  isActiveMenu(path: string) {
    return window.location.pathname.startsWith(path);
  }
}
