import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {EventsModel} from "../../models/events.model";
import {ParticipantesEventsModel} from "../../models/participantes.model";
import {ParticipantesModel} from "../../models/ParticipantesModel.model";
import {switchMap} from 'rxjs/operators';

import {cloneDeep} from 'lodash';


@Injectable({
  providedIn: 'root'
})

export class NewEventServiceAPI {
  private apiEventos: string = 'http://localhost:3000/eventos';
  private apiParticipantes: string = 'http://localhost:3001/participantes';

  evento = new EventsModel();
  participante: ParticipantesEventsModel;

  constructor(private httpClient: HttpClient) {
  }

  //teste api
  retornoEvento(): Observable<EventsModel[]> {
    return this.httpClient.get<EventsModel[]>(this.apiEventos);
  }

  cadastroEvento(evento: EventsModel): Observable<any> {
    console.log('to aqui', evento)
    return this.httpClient.post<any>(this.apiEventos, evento);
  }

  adicionarParticipante(participantes: ParticipantesModel): Observable<any> {
    console.log("Participante: " + participantes);
    return this.httpClient.post<any>(this.apiParticipantes, participantes);
  }

  //
  // adicionarParticipanteEvento
  // (idEvento: number, idParticipante: number, nomeParticipante: string, setorParticipante: string): Observable<any> {
  //   const url = `${this.apiEventos}/${idEvento}`;
  //   console.log('url no service: ', url)
  //   console.log('this.evento.participantes: ', this.evento.participantes.length)
  //   const eventoComNovoParticipante = {...this.evento};
  //   console.log('eventoComNovoParticipante: ', eventoComNovoParticipante)
  //   const novoParticipante: ParticipantesEventsModel = {
  //     idParticipante: idParticipante,
  //     nome: nomeParticipante,
  //     setor: setorParticipante,
  //   };
  //   console.log('novo participante: ', novoParticipante)
  //   eventoComNovoParticipante.participantes.push(novoParticipante);
  //   if (!eventoComNovoParticipante.participantes) {
  //     console.log('nao tem nada no ', eventoComNovoParticipante)
  //     eventoComNovoParticipante.participantes = [];
  //   }
  //   console.log('passou o participante - ', eventoComNovoParticipante)
  //   return this.httpClient.patch(url, eventoComNovoParticipante);
  // }

  //
  // adicionarParticipanteEvento
  // (idEvento: number, idParticipante: number, nomeParticipante: string, setorParticipante: string): Observable<any> {
  //   const url = `${this.apiEventos}/${idEvento}`;
  //   console.log('url no service: ', url)
  //   console.log('this.evento.participantes: ', this.evento.participantes.length)
  //   //const eventoComNovoParticipante = {...this.evento};
  //   console.log('eventoComNovoParticipante: ', this.evento)
  //   const novoParticipante: ParticipantesEventsModel = {
  //     idParticipante: idParticipante,
  //     nome: nomeParticipante,
  //     setor: setorParticipante,
  //   };
  //   console.log('novo participante: ', novoParticipante)
  //   this.evento.participantes.push(novoParticipante);
  //   if (!this.evento.participantes) {
  //     console.log('nao tem nada no ', this.evento)
  //     this.evento.participantes = [];
  //   }
  //   console.log('passou o participante - ', this.evento.participantes)
  //   return this.httpClient.patch(url, this.evento.participantes);
  // }


  adicionarParticipanteEvento(evento: EventsModel): Observable<any> {
    return this.httpClient.patch(`${this.apiEventos}/${evento.id}`, evento);
  }
}


@Injectable()
export class Service {
  providedIn: 'root'
}


