import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesListComponent } from './activities/activities-list/activities-list.component';
import { AuthorizedComponent } from './security/authorized/authorized.component';
import { ActivityRegisterComponent } from './activities/activity-register/activity-register.component';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { NotAuthorizedComponent } from './core/not-authorized.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'activities', pathMatch: 'full' },
  {
    path: 'activities/:id',
    component: ActivityRegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_REGISTER_ACTIVITY']}
  },
  {
    path: 'activities',
    component: ActivitiesListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_SEARCH_ACTIVITY']}
  },
  {
    path: 'activities/new',
    component: ActivityRegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_REGISTER_ACTIVITY'] }
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: '**', redirectTo: 'page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
