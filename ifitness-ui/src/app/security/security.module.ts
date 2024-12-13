import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedComponent } from './authorized/authorized.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IfitnessHttpInterceptor } from './ifitness-http-interceptor';
import { AuthGuard } from './auth.guard';

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

@NgModule({
  declarations: [
    AuthorizedComponent
  ],
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [ /localhost:8080/ ],
        disallowedRoutes: [/\/oauth2\/token/]
      }
    })
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IfitnessHttpInterceptor,
      multi: true
    },
    AuthGuard
  ]
})
export class SecurityModule { }
