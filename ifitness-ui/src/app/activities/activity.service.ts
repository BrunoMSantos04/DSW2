import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { Activity } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activitiesUrl = 'http://localhost:8080/activities';
  email: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  async list(): Promise<any> {
    const response = await this.http.get(`${this.activitiesUrl}`)
      .toPromise();
    return response;
  }

  listByUser(): Promise<any> {
    this.email = this.auth.jwtPayload?.sub;
    return this.http.get(`${this.activitiesUrl}/user/${this.email}`)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  add(activity: Activity): Promise<Activity> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<any>(this.activitiesUrl, Activity.toJson(activity), { headers })
      .toPromise();
  }

}
