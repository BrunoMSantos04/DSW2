import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesListComponent } from './activities/activities-list/activities-list.component';
import { AuthorizedComponent } from './security/authorized/authorized.component';

const routes: Routes = [
  { path: '', redirectTo: 'activities', pathMatch: 'full' },
  { path: 'activities', component: ActivitiesListComponent },
  { path: 'authorized', component: AuthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
