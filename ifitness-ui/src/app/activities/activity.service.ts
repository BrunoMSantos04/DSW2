import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import moment from 'moment';

import { Activity, User } from './../core/model';
import { AuthService } from '../security/auth.service';
import { DatePipe } from '@angular/common';

export class ActivityFilter {
  user?: any;
  type?: string;
  initialDate?: Date;
  finalDate?: Date;
  page = 0;
  itensPerPage = 5;
}


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activitiesUrl = 'http://localhost:8080/activities';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private datePipe: DatePipe
  ) { }

  search(filter: ActivityFilter): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams();

    if(filter.user){
      params = params.set('user', filter.user);
    }

    if (filter.type) {
      params = params.set('type', filter.type);
    }

    if (filter.initialDate) {
      params = params.set('initialDate', this.datePipe.transform(filter.initialDate, 'yyyy-MM-dd')!);
    }

    if (filter.finalDate) {
      params = params.set('finalDate', this.datePipe.transform(filter.finalDate, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.activitiesUrl}?resumo`, { headers, params })
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

  remove(id: number): Promise<any> {
    return this.http.delete(`${this.activitiesUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  update(activity: Activity): Promise<Activity> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<Activity>(`${this.activitiesUrl}/${activity.id}`, Activity.toJson(activity), { headers })
      .toPromise()
      .then((response: any) => {
        const updated = response;

        this.stringToDate(updated);

        return updated;
      });
  }

  findById(id: number): Promise<Activity> {
    return this.http.get<Activity>(`${this.activitiesUrl}/${id}`)
      .toPromise()
      .then((response: any) => {
        const activity = response;

        this.stringToDate(activity);

        return activity;
      });
  }

  private stringToDate(activity: any): void {
    activity.date = moment(activity.date, 'DD/MM/YYYY').toDate();
  }

}




