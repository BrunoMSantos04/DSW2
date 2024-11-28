import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../security/auth.service';
import { ActivityService } from '../activities/activity.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    ActivityService
  ],
  exports:[
    NavbarComponent
  ],
})
export class CoreModule { }
