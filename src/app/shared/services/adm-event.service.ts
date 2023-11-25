import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventsModel} from "../../models/events.model";

@Injectable({
  providedIn: 'root'
})
export class AdmEventService {


  private apiEventos: string = 'http://localhost:3000/eventos';

  constructor(private httpClient: HttpClient) {
  }

  getParticipante():Observable<any>{
    return this.httpClient.get(this.apiEventos);
  }

  alteraEvento(evento: EventsModel): Observable<any>{
    const url =`${this.apiEventos}\${evento.id}`;
    return this.httpClient.patch(url,evento );
  }

}

