import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AttendanceModule } from './mis/attendance/attendance.module';
import { ClassesModule } from './mis/classes/classes.module';
import { EmployeesModule } from './mis/employees/employees.module';
import { ExamsModule } from './mis/exams/exams.module';
import { FeesModule } from './mis/fees/fees.module';
import { HostelsModule } from './mis/hostels/hostels.module';
import { NotificationsModule } from './mis/notifications/notifications.module';
import { PaymentsModule } from './mis/payments/payments.module';
import { SetupModule } from './mis/setup/setup.module';
import { SmsModule } from './mis/sms/sms.module';
import { StudentsModule } from './mis/students/students.module';
import { SubjectsModule } from './mis/subjects/subjects.module';
import { TeachersModule } from './mis/teachers/teachers.module';
import { UsersModule } from './mis/users/users.module';
import { PortalModule } from './portal/portal.module';
import { routes } from './routes';
import { LoginComponent } from './login/login.component';
import { DashboardModule } from './mis/dashboard/dashboard.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomElementsModule } from './custom-elements/custom-elements.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
    CustomElementsModule,
    FormsModule,
    HttpClientModule,
    PortalModule,
    DashboardModule,
    AttendanceModule,
    ClassesModule,
    EmployeesModule,
    ExamsModule,
    FeesModule,
    HostelsModule,
    NotificationsModule,
    PaymentsModule,
    SetupModule,
    SmsModule,
    StudentsModule,
    SubjectsModule,
    TeachersModule,
    UsersModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
