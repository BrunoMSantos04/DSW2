import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { Activity } from '../core/model';
import moment from 'moment';

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

  async remove(id: number): Promise<any> {
    await this.http.delete(`${this.activitiesUrl}/${id}`)
      .toPromise();
    return null;
  }

  async update(activity: Activity): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    const response = await this.http.put<Activity>(`${this.activitiesUrl}/${activity.id}`, Activity.toJson(activity), { headers })
      .toPromise();
    const updated = response;
    this.stringToDate(updated);
    return updated;
  }

  async findById(id: number): Promise<any> {
    const response = await this.http.get<Activity>(`${this.activitiesUrl}/${id}`)
      .toPromise();
    const activity = response;
    this.stringToDate(activity);
    return activity;
  }

  private stringToDate(activity: any): void {
    activity.date = moment(activity.date, 'DD/MM/YYYY').toDate();
  }

  add(activity: Activity): Promise<Activity> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<any>(this.activitiesUrl, Activity.toJson(activity), { headers })
      .toPromise();
  }

}
