import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { ActivitiesListComponent } from './activities-list/activities-list.component';

@NgModule({
  declarations: [
    ActivitiesListComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    TooltipModule
  ],
  exports: [
    ActivitiesListComponent
  ]
})
export class ActivitiesModule { }
