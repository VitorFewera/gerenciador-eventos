import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService} from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
import {ParticipantesModel} from "../../../models/ParticipantesModel.model";
import { ParticipantesEventsModel } from 'src/app/models/participantes.model';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  mostrarUsuario: ParticipantesModel[] = [];

  userMenuItems = [{
    text: 'Perfil',
    icon: 'user',
    onClick: () => {
      this.router.navigate(['/profile']);
    }
  },
  {
    text: 'Sair',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    }
  }];

  constructor(private authService: AuthService, private router: Router) {
    const urlString = localStorage.getItem('user');
    console.log(urlString);
    const url = JSON.parse(urlString)
    console.log('log do component, antes do service: ',url)
    this.authService.exibirUsuario(url).subscribe((usuario: ParticipantesModel[]) => {
      console.log('log do component: ',usuario);
      this.mostrarUsuario = usuario;
    })
  }

  ngOnInit() {
 //   this.authService.getUser().then((e) => this.user = e.data);
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
