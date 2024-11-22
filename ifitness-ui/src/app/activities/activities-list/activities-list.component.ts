import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrl: './activities-list.component.css'
})
export class ActivitiesListComponent implements OnInit{

  activities = [];

  constructor(
    private activityService: ActivityService,
    private auth: AuthService)
  { }

  ngOnInit(): void {
    if (this.auth.isInvalidAccessToken()) {
      this.auth.login();
    }
    this.list();
  }

  list(): void {
    this.activityService.list()
      .then(result => {
        this.activities = result;
      });
  }

}
