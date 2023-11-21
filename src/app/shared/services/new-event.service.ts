import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {EventsModel} from "../../models/events.model";
import {ParticipantesEventsModel} from "../../models/participantes.model";
import {ParticipantesModel} from "../../models/ParticipantesModel.model";


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

  testeUpdate(testeId: number, informacao: any) {
    const url = `${this.apiEventos}/${testeId}`;
    console.log("chegou service " + url + testeId, informacao)
    return this.httpClient.patch(url, informacao);
  }

  adicionarParticipante(participantes: ParticipantesModel): Observable<any> {
    console.log("Participante: " + participantes);
    return this.httpClient.post<any>(this.apiParticipantes, participantes);
  }


  adicionarParticipanteEvento(idEvento: number, idParticipante: string): Observable<any> {
    const url = `${this.apiEventos}/${idEvento}`;
    console.log('url no service: ', url)
    //a copia
    const eventoComNovoParticipante = {...this.evento};
    //insert
    const novoParticipante: ParticipantesEventsModel = {
      idParticipante: idParticipante,
      nome: '',
      setor: '',
    };
    console.log('novo participante: ', novoParticipante)

    eventoComNovoParticipante.participantes.push(novoParticipante);
    console.log('passou o participante - ', eventoComNovoParticipante)

    return this.httpClient.patch(url, eventoComNovoParticipante);
  }

}


@Injectable()
export class Service {
  providedIn: 'root'
}


