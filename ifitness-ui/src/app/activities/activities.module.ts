import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ActivityRegisterComponent } from './activity-register/activity-register.component';
@NgModule({
  declarations: [
    ActivitiesListComponent,
    ActivityRegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    DropdownModule
  ],
  exports: [
    ActivitiesListComponent,
    ActivityRegisterComponent
  ]
})
export class ActivitiesModule { }
