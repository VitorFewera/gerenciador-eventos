import {Component, enableProdMode, OnInit } from '@angular/core';

import {EventsModel} from "../../models/events.model";

import {HttpClient} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import {lastValueFrom} from 'rxjs/internal/lastValueFrom';



if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-adm-event',
  providers: [],
  templateUrl: './adm-event.component.html',
  styleUrls: ['./adm-event.component.scss'],
  preserveWhitespaces: true,
})


export class AdmEventComponent implements OnInit {


  ngOnInit(): void {
  }

  eventosCadastrados: any;

  evento: EventsModel = new EventsModel();

  private eventos: EventsModel[];

  refreshModes: string[];

  refreshMode: string;

  requests: string[] = [];

  tiposEventos = [
    {id: 1, name: "Esportes Vôlei/Beach Tennis"},
    {id: 2, name: "Churrasco"},
    {id: 3, name: "Diversos"}
  ];

  private url = 'http://localhost:3000/eventos';

  constructor(private http: HttpClient) {

    this.refreshMode = 'reshape';
    this.refreshModes = ['full', 'reshape', 'repaint'];

    this.eventosCadastrados = new CustomStore({
      key: 'id',
      load: () => this.sendRequest(this.url),
      update: (key, values) => {
        const body: EventsModel = this.eventos.find((event: EventsModel) => event.id === key);
        return this.sendRequest(`${this.url}/${key}`, 'PUT', Object.assign({}, body, values))
      },
      remove: (key) => this.sendRequest(`${this.url}/${key}`, 'DELETE'),
    })};


    sendRequest(url: string, method: string = 'GET', body: any = {}): any {
      let result = this.http.get(url);
      switch (method) {
        case 'PUT':
          result = this.http.put(url, body);
          break;
        case 'POST':
          result = this.http.post(url, body);
          break;
        case 'DELETE':
          result = this.http.delete(url);
          break;
      }

      return lastValueFrom(result).then((data: any) => {
        if (method === 'GET') {
          this.eventos = data;
        }
        return data;
      }).catch((e) => {
        throw e && e.error && e.error.Message;
      });
    }

  clearRequests() {
    this.requests = [];
  }



}

