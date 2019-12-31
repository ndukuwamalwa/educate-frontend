import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeesImportComponent } from './employees-import/employees-import.component';
import { EmployeesViewComponent } from './employees-view/employees-view.component';
import { EmployeesManageComponent } from './employees-manage/employees-manage.component';
import { EmployeeService } from './employee.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeAddComponent,
    EmployeesImportComponent,
    EmployeesViewComponent,
    EmployeesManageComponent,
    EmployeeDetailComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    CustomElementsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule
  ],
  exports: [
    EmployeesComponent
  ],
  providers: [
    EmployeeService
  ],
  entryComponents: [
    EmployeeDetailComponent
  ]
})
export class EmployeesModule { }
