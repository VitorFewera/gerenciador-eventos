import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {EventsModel} from "../../models/events.model";
import {ParticipantesModel} from "../../models/participantes.model";



@Injectable({
  providedIn: 'root'
})

export class NewEventServiceAPI{
  private apiEventos: string = 'http://localhost:3000/eventos';
  private apiParticipantes: string = 'http://localhost:3001/participantes';

  evento = new EventsModel();

  constructor(private httpClient:HttpClient) {}

  //teste api
  retornoEvento(): Observable<EventsModel[]>{
    return this.httpClient.get<EventsModel[]>(this.apiEventos);
  }

  cadastroEvento(evento: EventsModel): Observable<any>{
    console.log('to aqui', evento)
    return this.httpClient.post<any>(this.apiEventos, evento);
  }

  adicionarParticipante(participantes: ParticipantesModel): Observable<any>{
    return this.httpClient.post<any>(this.apiParticipantes, participantes);
  }

  addParticipantToEvent(eventId: number, participante: ParticipantesModel) {
    const url = this.apiEventos + `/${eventId}/participantes`;
    return this.httpClient.post(url, participante);
  }

  testeUpdate(testeId: number, informacao = {}){
    const url = this.apiEventos + `/${testeId}/`;
    console.log("chegou service " + url + testeId,informacao)
    return this.httpClient.patch(url, this.evento.participantes);
  }
}


@Injectable()
export class Service {
  providedIn: 'root'
}


