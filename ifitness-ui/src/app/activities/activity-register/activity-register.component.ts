import { Component } from '@angular/core';
import { Activity } from '../../core/model';
import { NgForm } from '@angular/forms';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-activity-register',
  templateUrl: './activity-register.component.html',
  styleUrl: './activity-register.component.css'
})
export class ActivityRegisterComponent {
  types = [
    { label: 'Caminhada', value: 'CAMINHADA' },
    { label: 'Ciclismo', value: 'CICLISMO' },
    { label: 'Corrida', value: 'CORRIDA' },
    { label: 'Natação', value: 'NATACAO' }
  ];

  activity = new Activity();


  constructor(private activityService: ActivityService){}

  save(activityForm: NgForm) {
    this.activityService.add(this.activity)
      .then(() => {
        console.log('Atividade adicionada com sucesso!');
        activityForm.reset();
        this.activity = new Activity();
      })
      .catch(erro => console.log(erro));
  }
}
