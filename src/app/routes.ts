import { Routes } from '@angular/router';
import { UserComponent } from './core/user/user/user.component';
import { AttendanceCreateComponent } from './core/attendance/attendance-create/attendance-create.component';
import { BatchComponent } from './core/batch/batch/batch.component';
import { ExamComponent } from './core/exams/exam/exam.component';
import { FinanceComponent } from './core/finance/finance/finance.component';
import { HrComponent } from './core/hr/hr/hr.component';
import { InstituteComponent } from './core/institute/institute/institute.component';
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
import { BatchPageComponent } from './core/batch/batch-page/batch-page.component';

export const routes: Routes = [
    {
        path: "",
        component: StudentComponent
    },
    {
        path: 'users',
        component: UserComponent
    },
    {
        path: 'users/:id',
        component: UserPageComponent
    },
    {
        path: 'attendance',
        component: AttendanceCreateComponent,
        pathMatch: 'full'
    },
    {
        path: 'batch',
        component: BatchComponent
    },
    {
        path: 'batch/:id',
        component: BatchPageComponent
    },
    {
        path: 'exams',
        component: ExamComponent
    },
    {
        path: 'exams/:id',
        component: ExamPageComponent
    },
    {
        path: 'finance',
        component: FinanceComponent
    },
    {
        path: 'hr',
        component: HrComponent
    },
    {
        path: 'hr/:id',
        component: HrPageComponent
    },
    {
        path: 'institute',
        component: InstituteComponent
    },
    {
        path: 'students',
        component: StudentComponent
    },
    {
        path: 'students/:id',
        component: StudentPageComponent
    },
    {
        path: 'teachers',
        component: TeacherComponent
    },
    {
        path: 'teachers/:id',
        component: TeacherPageComponent
    },
    {
        path: 'subjects',
        component: SubjectComponent
    },
    {
        path: 'sms',
        component: SmsComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
];