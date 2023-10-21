import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {EventsModel} from "../../models/events.model";


@Injectable({
  providedIn: 'root'
})

export class NewEventServiceAPI{
  private apiREST: string = 'http://localhost:3000/eventos' ;

  constructor(private httpClient:HttpClient) {
    //this.apiREST = 'http://localhost:3000/eventos';
  }
  //teste api
  retornoEvento(): Observable<EventsModel[]>{
    return this.httpClient.get<EventsModel[]>(this.apiREST);
  }

  cadastroEvento(evento: EventsModel): Observable<EventsModel>{
    return this.httpClient.post<EventsModel>(this.apiREST, evento);
  }
}


const tipoEvento : string[] = [
  'Churrasco',
  'Corporativo',
  'Opção para adicionar',
  'Por configuração que ',
  'vou adicionar depois',
];

const participantesEventos : string[] = [
  'Aberto para o setor',
  'Aberto para o Alojamento',
  'Aberto para todos os setores',
  'Institucional',
  'vou adicionar depois',
];

@Injectable()
export class Service {
  getTipoEvento() : string[] {
    return tipoEvento;
  }

  getParticipantesEventos(): string[]{
    return participantesEventos;
  }

}


