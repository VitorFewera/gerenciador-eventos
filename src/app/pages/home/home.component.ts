import {Component, OnInit} from '@angular/core';
import {NewEventServiceAPI, Service} from "../../shared/services/new-event.service";

import {Router} from "@angular/router";
import {EventsModel} from "../../models/events.model";
import {ParticipantesModel} from "../../models/ParticipantesModel.model";
import {ParticipantesEventsModel} from "../../models/participantes.model";
import {AuthService} from "../../shared/services";

@Component({
  templateUrl: 'home.component.html',
  providers: [NewEventServiceAPI, Service],
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  cardEvento: EventsModel = new EventsModel();

  participante: ParticipantesEventsModel = new ParticipantesEventsModel();

  mostrarEvento: EventsModel[] = [];

  mostrarUsuario: ParticipantesModel[] = [];

  popupVisible = false;

  texto: string = 'Informe seus dados: ';

  navegar: any = [];


  constructor(private service: NewEventServiceAPI, private authService: AuthService, private router: Router) {
    const urlString = localStorage.getItem('user');
    console.log(urlString);
    const url = JSON.parse(urlString)
    console.log('log do component, antes do service: ',url)
    this.authService.exibirUsuario(url).subscribe((usuario: ParticipantesModel[]) => {
      console.log('log do component: ',usuario);
      this.mostrarUsuario = usuario;
    })
  }

  ngOnInit(): void {
    this.service.retornoEvento().subscribe((evento: EventsModel[]) => {
      console.log(evento);
      this.mostrarEvento = evento
    })
  }

  popup(eventoSelecionado: any) {
    this.cardEvento = eventoSelecionado;
    console.log(eventoSelecionado)
    this.popupVisible = true;
  }

  fecharPopup(){
    return this.popupVisible = false;
  }

  partiparEvento(idEvento: number, idParticipante: number, nomeParticipante: string, setorParticipante: string){
    console.log(idEvento, idParticipante)

    this.service.adicionarParticipanteEvento(idEvento,idParticipante,nomeParticipante,setorParticipante).subscribe(
      (passando) => console.log(passando)
    )
  }

  administrar(){
    this.router.navigate(['/adm-event']);
  }


}
