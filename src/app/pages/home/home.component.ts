import {Component, OnInit} from '@angular/core';
import {NewEventServiceAPI, Service} from "../../shared/services/new-event.service";

import {Router, RouterModule} from "@angular/router";
import {EventsModel} from "../../models/events.model";
import {ParticipantesModel} from "../../models/participantes.model";

@Component({
  templateUrl: 'home.component.html',
  providers: [NewEventServiceAPI, Service],
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  cardEvento: EventsModel = new EventsModel();

  mostrarEvento: EventsModel[] = [];

  participante: ParticipantesModel = new ParticipantesModel();

  popupVisible = false;

  texto: string = 'Informe seus dados: ';

  participanteNome: string;

  participanteSetor: any;

  navegar: any = [];

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

  constructor(private service: NewEventServiceAPI, private router: Router) {
   // this.cardEvento.participantes = new Array<ParticipantesModel>;
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

  administrar(){
    this.router.navigate(['/adm-event']);
  }

  part: any = [];
  participantes(): Array<ParticipantesModel>{
    const retornoParticipantes: any = [];
    const participantes: ParticipantesModel = new ParticipantesModel();
    participantes.nome = this.participanteNome;
    participantes.setor = this.participanteSetor;
    retornoParticipantes.push(participantes);
    console.log(retornoParticipantes);
    return retornoParticipantes;
  }

  participanteTeste(idEvento: number){
    const participante: any = [];
    participante.push(this.participanteNome,this.participanteSetor);
    this.service.testeUpdate(idEvento, participante).subscribe(
      () => console.log("passou component")
    )
  }
  /*
  cadastrarParticipantes(participantes: ParticipantesModel){
    console.log(participantes);
    this.service.adicionarParticipante(participantes).subscribe(
      () =>  console.log(participantes));
    this.fecharPopup();
  }
*/


}
