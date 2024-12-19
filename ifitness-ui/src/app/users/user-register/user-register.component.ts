import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { UserService } from '../user.service';
import { Title } from '@angular/platform-browser';
import { User } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  user = new User();

  genders = [
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Feminino', value: 'FEMININO' },
    { label: 'Outro', value: 'OUTRO' },
    { label: 'Prefiro não dizer', value: 'PREFIRO_NAO_DIZER' }
  ];

  constructor(
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
    private title: Title
  ){}

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Usuário');
  }

  save(userForm: NgForm) {
    this.userService.add(this.user)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso!' });
        this.router.navigate(['/home']);
      })
      .catch(error => this.errorHandler.handle(error));
  }
}
