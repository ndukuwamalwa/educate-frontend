import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './mis/dashboard/dashboard/dashboard.component';
import { AttandanceComponent } from './mis/attendance/attandance/attandance.component';
import { ClassesComponent } from './mis/classes/classes/classes.component';
import { EmployeesComponent } from './mis/employees/employees/employees.component';
import { ExamsComponent } from './mis/exams/exams/exams.component';
import { FeesComponent } from './mis/fees/fees/fees.component';
import { HostelsComponent } from './mis/hostels/hostels/hostels.component';
import { PaymentsComponent } from './mis/payments/payments/payments.component';
import { SetupComponent } from './mis/setup/setup/setup.component';
import { SmsComponent } from './mis/sms/sms/sms.component';
import { StudentsComponent } from './mis/students/students/students.component';
import { SubjectsComponent } from './mis/subjects/subjects/subjects.component';
import { TeachersComponent } from './mis/teachers/teachers/teachers.component';
import { UsersComponent } from './mis/users/users/users.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent,
        canActivate: [
            LoginGuard
        ]
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "attendance/:tab/:subtab",
        component: AttandanceComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "classes/:tab/:subtab",
        component: ClassesComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "employees/:tab/:subtab",
        component: EmployeesComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "exams/:tab/:subtab",
        component: ExamsComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "fees/:tab/:subtab",
        component: FeesComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "hostels/:tab/:subtab",
        component: HostelsComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "payments/:tab/:subtab",
        component: PaymentsComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "setup/:tab/:subtab",
        component: SetupComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "sms/:tab/:subtab",
        component: SmsComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "students/:tab/:subtab",
        component: StudentsComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "subjects/:tab/:subtab",
        component: SubjectsComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "teachers/:tab/:subtab",
        component: TeachersComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "users/:tab/:subtab",
        component: UsersComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: "**",
        redirectTo: ""
    }
];