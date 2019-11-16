import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/loader/loader.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoaderModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
