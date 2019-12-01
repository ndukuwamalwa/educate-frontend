import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { AttendanceModule } from './attendance/attendance.module';
import { BatchModule } from './class/class.module';
import { ExamsModule } from './exams/exams.module';
import { FinanceModule } from './finance/finance.module';
import { HrModule } from './hr/hr.module';
import { HostelsModule } from './hostels/hostels.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { SubjectModule } from './subject/subject.module';
import { SmsModule } from './sms/sms.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserModule,
    AttendanceModule,
    BatchModule,
    ExamsModule,
    FinanceModule,
    HrModule,
    HostelsModule,
    StudentModule,
    TeacherModule,
    SubjectModule,
    SmsModule,
    SettingsModule,
    AuthModule
  ],
  exports: [
    
  ]
})
export class CoreModule { }
