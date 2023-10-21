import { Component } from '@angular/core';
import {NewEventComponent} from "../new-event/new-event.component";
import {Service} from "../../shared/services/new-event.service";
import {UserModels} from "../../models/user.model";
import {UserPanelModule} from "../../shared/components";

@Component({
  templateUrl: 'profile.component.html',
  providers:[NewEventComponent, Service],
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {


user = new UserPanelModule();


  colCountByScreen: object;

  constructor() {
    this.user = {
      id:1,
      name:'Vitor Hugo',
      sector: 'SIA',
      email:'vitor.ferreira@fiorilli.com.br',
      image: '/assets/img/perfil.jpg',
      login:'',
      password:''
    };

    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }
}
