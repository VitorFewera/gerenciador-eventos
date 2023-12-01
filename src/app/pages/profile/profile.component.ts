import { Component } from '@angular/core';
import {NewEventComponent} from "../new-event/new-event.component";
import {Service} from "../../shared/services/new-event.service";

import {UserPanelModule} from "../../shared/components";
import {ParticipantesModel} from "../../models/ParticipantesModel.model";
import {ParticipantesEventsModel} from "../../models/participantes.model";
import {AuthService} from "../../shared/services";
import {EventsModel} from "../../models/events.model";

@Component({
  templateUrl: 'profile.component.html',
  providers:[NewEventComponent, Service],
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {

  mostrarUsuario: ParticipantesModel[] = [];

  labelFloating: string;

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


  constructor(private authService: AuthService) {
    const urlString = localStorage.getItem('user');
    console.log(urlString);
    const url = JSON.parse(urlString)
    console.log('log do component, antes do service: ',url)
    this.authService.exibirUsuario(url).subscribe((usuario: ParticipantesModel[]) => {
      console.log('log do component: ',usuario);
      this.mostrarUsuario = usuario;
    })
    this.labelFloating = 'floating';

  }
}
