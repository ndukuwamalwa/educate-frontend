import { Routes } from '@angular/router';
import { UserComponent } from './core/user/user/user.component';
import { AttendanceCreateComponent } from './core/attendance/attendance-create/attendance-create.component';
import { ClassComponent } from './core/class/class/class.component';
import { ExamComponent } from './core/exams/exam/exam.component';
import { FinanceComponent } from './core/finance/finance/finance.component';
import { HrComponent } from './core/hr/hr/hr.component';
import { HostelsComponent } from './core/hostels/hostels/hostels.component';
import { StudentComponent } from './core/student/student/student.component';
import { TeacherComponent } from './core/teacher/teacher/teacher.component';
import { SubjectComponent } from './core/subject/subject/subject.component';
import { SmsComponent } from './core/sms/sms/sms.component';
import { SettingsComponent } from './core/settings/settings/settings.component';
import { UserPageComponent } from './core/user/user-page/user-page.component';
import { StudentPageComponent } from './core/student/student-page/student-page.component';
import { TeacherPageComponent } from './core/teacher/teacher-page/teacher-page.component';
import { HrPageComponent } from './core/hr/hr-page/hr-page.component';
import { ExamPageComponent } from './core/exams/exam-page/exam-page.component';
import { ClassPageComponent } from './core/class/class-page/class-page.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { DashboardComponent } from './core/dashboard/dashboard/dashboard.component';
import { StreamPageComponent } from './core/class/stream-page/stream-page.component';
import { ChequePageComponent } from './core/finance/cheque-page/cheque-page.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent,
        canActivate: [
            LoginGuard
        ]
    },
    {
        path: 'home',
        component: DashboardComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'users',
        component: UserComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'users/:id',
        component: UserPageComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'attendance',
        component: AttendanceCreateComponent,
        pathMatch: 'full',
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'class',
        component: ClassComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "class/stream/:id",
        component: StreamPageComponent
    },
    {
        path: 'class/:id',
        component: ClassPageComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'exams',
        component: ExamComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'exams/:id',
        component: ExamPageComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'finance',
        component: FinanceComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'finance/cheque/:id',
        component: ChequePageComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'hr',
        component: HrComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'hr/:id',
        component: HrPageComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'hostels',
        component: HostelsComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'students',
        component: StudentComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'students/:id',
        component: StudentPageComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'teachers',
        component: TeacherComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'teachers/:id',
        component: TeacherPageComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'subjects',
        component: SubjectComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'sms',
        component: SmsComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [
            AuthGuard
        ]
    }
];