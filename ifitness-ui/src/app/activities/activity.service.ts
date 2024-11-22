import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activitiesUrl = 'http://localhost:8080/activities';

  constructor(private http: HttpClient) { }

  async list(): Promise<any> {
    const response = await this.http.get(`${this.activitiesUrl}`)
      .toPromise();
    return response;
  }

}
