import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { UserRegisterComponent } from './user-register/user-register.component';
import { SharedModule } from '../shared/shared.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    SharedModule,
    RouterModule,
    CalendarModule
  ],
  exports: [
    UserRegisterComponent
  ]
})
export class UsersModule { }
