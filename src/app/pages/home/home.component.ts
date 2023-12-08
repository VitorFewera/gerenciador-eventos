import {Component, OnInit} from '@angular/core';
import {NewEventServiceAPI, Service} from "../../shared/services/new-event.service";

import {Router} from "@angular/router";
import {EventsModel} from "../../models/events.model";
import {ParticipantesModel} from "../../models/ParticipantesModel.model";
import {ParticipantesEventsModel} from "../../models/participantes.model";
import {AuthService} from "../../shared/services";
import Swal from "sweetalert2";

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

  constructor(private service: NewEventServiceAPI, private authService: AuthService, private router: Router) {
    const urlString = localStorage.getItem('user');
    const url = JSON.parse(urlString)
    this.authService.exibirUsuario(url).subscribe((usuario: ParticipantesModel[]) => {
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
    this.popupVisible = true;
  }

  fecharPopup(){
    return this.popupVisible = false;
  }

  partiparEvento(usuario: ParticipantesModel): void{
    this.cardEvento.participantes.push({
      idParticipante: usuario.id,
      nome: usuario.nome,
      setor: usuario.setor,
    });
    this.service.adicionarParticipanteEvento(this.cardEvento).subscribe();
    this.fecharPopup();

    Swal.fire({
      position: "center",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      width: 500,
      html: '<span style="font-size: 20px;">Participação aplicada com Sucesso!</span>',
    });
  }

  deixarEvento(idParticipante: number): void {
    this.cardEvento.participantes = this.cardEvento.participantes.filter(participante => participante.idParticipante !== idParticipante);
    this.service.deixarEvento(this.cardEvento).subscribe();
    this.fecharPopup();

    Swal.fire({
      position: "center",
      icon: "warning",
      showConfirmButton: false,
      timer: 1500,
      width: 500,
      html: '<span style="font-size: 20px;">Voce deixou de participar do evento!</span>',
    });
  }

  administrar(){
    this.router.navigate(['/adm-event']);
  }



}
