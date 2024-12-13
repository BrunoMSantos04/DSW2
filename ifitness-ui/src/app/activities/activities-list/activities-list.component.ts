import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import { ActivityService } from '../activity.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrl: './activities-list.component.css'
})
export class ActivitiesListComponent implements OnInit{

  activities = [];

  constructor(
    private auth: AuthService,
    private activityService: ActivityService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ){ }

  ngOnInit(): void {
    if (this.auth.isInvalidAccessToken()) {
      this.auth.login();
    }
    this.title.setTitle('Listagem de Atividades');
    this.list();
  }

  list(): void {
    this.activityService.listByUser()
      .then(result => {
        this.activities = result;
      })
      .catch(error => this.errorHandler.handle(error));
  }



  confirmRemoval(activity: any): void {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.remove(activity);
      }
    });
  }

  remove(activity: any): void {
    this.activityService.remove(activity.id)
      .then(() => {
        this.list();
        this.messageService.add({ severity: 'success', detail: 'Atividade excluída com sucesso!' });
      })
      .catch(error => this.errorHandler.handle(error));
  }

}
