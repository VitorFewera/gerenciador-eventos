import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {EventsModel} from "../../models/events.model";
import {ParticipantesEventsModel} from "../../models/participantes.model";
import {ParticipantesModel} from "../../models/ParticipantesModel.model";



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

  testeUpdate(testeId: number, informacao:any){
    const url = `${this.apiEventos}/${testeId}`;
    console.log("chegou service " + url + testeId,informacao)
    return this.httpClient.patch(url, informacao);
  }

  adicionarParticipante(participantes: ParticipantesEventsModel, idEvento: number): Observable<any>{
    const url = `${this.apiEventos}/${idEvento}`;
    this.evento.participantes.push(participantes);
    console.log("Participante: "+ participantes, "idEvento: "+ idEvento);
    return this.httpClient.post<any>(url, participantes);
  }
}


@Injectable()
export class Service {
  providedIn: 'root'
}


