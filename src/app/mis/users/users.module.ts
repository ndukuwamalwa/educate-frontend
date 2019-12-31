import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { AddUserComponent } from './add-user/add-user.component';
import { AddUserGroupComponent } from './add-user-group/add-user-group.component';
import { ViewUserGroupsComponent } from './view-user-groups/view-user-groups.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { UserService } from './user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { UserDetailsComponent } from './user-details/user-details.component';
import { GroupDetailsComponent } from './group-details/group-details.component';



@NgModule({
  declarations: [
    UsersComponent, 
    AddUserComponent, 
    AddUserGroupComponent, 
    ViewUserGroupsComponent, 
    ViewUsersComponent,
    UserDetailsComponent,
    GroupDetailsComponent
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
    UsersComponent
  ],
  entryComponents: [
    UserDetailsComponent,
    GroupDetailsComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
