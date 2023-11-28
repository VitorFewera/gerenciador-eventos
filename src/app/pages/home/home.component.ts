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

  popupVisible = false;

  texto: string = 'Informe seus dados: ';

  navegar: any = [];

  userData = localStorage.getItem('userData');

  constructor(private service: NewEventServiceAPI, private serviceAuth: AuthService, private router: Router) {}

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

  partiparEvento(idEvento: number, idParticipante: string){
    console.log(idEvento, idParticipante)
    const receberJSON = localStorage.getItem('user')
    const idPar = JSON.parse(receberJSON);
    idParticipante = idPar.valueOf();
    console.log("idParticipante depois do JSON.parse", idParticipante)
    this.service.adicionarParticipanteEvento(idEvento,idParticipante).subscribe(
      (passando) => console.log(passando)
    )
  }

  administrar(){
    this.router.navigate(['/adm-event']);
  }


}
