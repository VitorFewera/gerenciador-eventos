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

}


@Injectable()
export class Service {
  providedIn: 'root'
}


