import {Component, OnInit} from '@angular/core';
import {NewEventServiceAPI, Service} from "../../shared/services/new-event.service";

import {Router} from "@angular/router";
import {EventsModel} from "../../models/events.model";
import {ParticipantesModel} from "../../models/ParticipantesModel.model";
import {ParticipantesEventsModel} from "../../models/participantes.model";

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


  constructor(private service: NewEventServiceAPI, private router: Router) {

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

  partiparEvento(idEvento: number, idParticipante: number){
    console.log(idEvento, idParticipante)
    idParticipante = 2;
    this.service.adicionarParticipanteEvento(idEvento,idParticipante).subscribe(
      (passando) => console.log(passando)
    )
  }

  administrar(){
    this.router.navigate(['/adm-event']);
  }


}
