import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ActivitiesModule } from './activities/activities.module';
import { SecurityModule } from './security/security.module';
import { AuthService } from './security/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { Dropdown } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ActivitiesModule,
    SecurityModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }


// pra rodar "  ng serve --o --host localhost --port 8000 --disable-host-check "
