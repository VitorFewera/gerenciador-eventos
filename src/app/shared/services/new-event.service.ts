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

  }
  //teste api
  retornoEvento(): Observable<EventsModel[]>{
    return this.httpClient.get<EventsModel[]>(this.apiREST);
  }

  cadastroEvento(evento: EventsModel): Observable<EventsModel>{
    return this.httpClient.post<EventsModel>(this.apiREST, evento);
  }
}


@Injectable()
export class Service {


}


