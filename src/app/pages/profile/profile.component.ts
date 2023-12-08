import { Component } from '@angular/core';
import {NewEventComponent} from "../new-event/new-event.component";
import {Service} from "../../shared/services/new-event.service";
import {ParticipantesModel} from "../../models/ParticipantesModel.model";
import {AuthService} from "../../shared/services";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'profile.component.html',
  providers:[NewEventComponent, Service],
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {

  mostrarUsuario: ParticipantesModel[] = [];

  labelFloating: string;

  usuario: ParticipantesModel = new ParticipantesModel();

  setores = [
    {id: 1, name: 'SIA'},
    {id: 2, name: 'SCPI'},
    {id: 3, name: 'SIP'},
    {id: 4, name: 'SIE e agregados'},
    {id: 5, name: 'Juridico'},
    {id: 6, name: 'Administrativo'},
    {id: 7, name: 'Limpeza'},
    {id: 8, name: 'Convidado'},
  ]

  constructor(private authService: AuthService, private router: Router) {
    const urlString = localStorage.getItem('user');
    const url = JSON.parse(urlString)
    this.authService.exibirUsuario(url).subscribe((usuario: ParticipantesModel[]) => {
      this.mostrarUsuario = usuario;
    })
    this.labelFloating = 'floating';
  }

  voltar(){
    this.router.navigate(['/home'])
  }
}
