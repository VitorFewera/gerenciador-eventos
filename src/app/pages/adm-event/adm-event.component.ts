import {Component, enableProdMode, ChangeDetectionStrategy, OnInit, NgModule, LOCALE_ID} from '@angular/core';
import {AdmEventService} from "../../shared/services/adm-event.service";
import {EventsModel} from "../../models/events.model";
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
  HttpClient, HttpClientModule, HttpHeaders, HttpParams,
} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import {lastValueFrom} from 'rxjs/internal/lastValueFrom';
import {formatDate} from 'devextreme/localization';
import DevExpress from "devextreme";
import data = DevExpress.data;
import {DateUtils} from "../../shared/pipe/date-utils";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DxFormModule} from "devextreme-angular/ui/form";
import {DxLoadIndicatorModule} from "devextreme-angular/ui/load-indicator";
import {
  DxButtonModule, DxDataGridModule,
  DxFileUploaderModule,
  DxProgressBarModule,
  DxSelectBoxModule,
  DxTextBoxModule
} from "devextreme-angular";
import {FormsModule} from "@angular/forms";
import {DxoTextModule} from "devextreme-angular/ui/nested";
import {CreateAccountFormComponent} from "../../shared/components";

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-adm-event',
  providers: [AdmEventService],
  templateUrl: './adm-event.component.html',
  styleUrls: ['./adm-event.component.scss'],
  preserveWhitespaces: true,
})


export class AdmEventComponent implements OnInit {


  ngOnInit(): void {
  }

  eventosCadastrados: any;

  evento: EventsModel = new EventsModel();

  participantesEventoData: any;

  customersData: any;

  tipoEventoData: any;
  private eventos: EventsModel[];

  refreshModes: string[];

  refreshMode: string;

  requests: string[] = [];

  meuPipe = DateUtils.toLocaleDate(this.evento.dataEvento);

  private url = 'http://localhost:3000/eventos';

  constructor(private http: HttpClient) {

    this.refreshMode = 'reshape';
    this.refreshModes = ['full', 'reshape', 'repaint'];

  //   this.eventosCadastrados = new CustomStore({
  //
  //     key: 'id',
  //     load: () => this.sendRequest(`${this.url}`),
  //     update: (key, values) => {
  //
  //       console.log('Valor do update: ', values)
  //       //this.evento.dataEvento = formatDate(new Date(), 'dd/MM/yyyy');
  //       values = DateUtils.toLocaleDate(this.evento.dataEvento)
  //
  //       console.log('Valor da dataEvento: ', this.evento.dataEvento)
  //
  //       return this.sendRequest(`${this.url}/${key}`, 'PUT', {
  //         key,
  //         values,
  //       })
  //     },
  //     remove: (key) => this.sendRequest(`${this.url}/${key}`, 'DELETE', {
  //       key,
  //     }),
  //   });
  //
  //   this.participantesEventoData = new CustomStore({
  //     key: 'idParticipante',
  //     loadMode: 'raw',
  //     load: () => this.sendRequest(`${this.url}/`),
  //   })
  //
  //
  //   this.tipoEventoData = new CustomStore({
  //     key: 'tipoEvento',
  //     loadMode: 'raw',
  //     load: () => this.sendRequest(`${this.url}/tipoEvento`),
  //   });
  // }
  //
  //
  // sendRequest(url, method = 'GET', data: any = {}): any {
  //   this.logRequest(method, url, data);
  //
  //   const httpParams = new HttpParams({fromObject: data});
  //   const httpOptions = {withCredentials: true, body: httpParams};
  //   let result;
  //
  //
  //   switch (method) {
  //     case 'GET':
  //       result = this.http.get(url);
  //       console.log('pegou o get: ', result)
  //       break;
  //     case 'PUT':
  //       result = this.http.put(url, httpParams, httpOptions);
  //       break;
  //     case 'POST':
  //       result = this.http.post(url, httpParams, httpOptions);
  //       break;
  //     case 'DELETE':
  //       result = this.http.delete(url, httpOptions);
  //       break;
  //   }
  //   console.log('dentro do sendResquest: ', result);
  //
  //   return lastValueFrom(result)
  //     .then((data: any) => data)
  //     .catch((e) => {
  //       throw e && e.error && e.error.Message;
  //     });
  // }
  //
  // logRequest(method: string, url: string, data: object): void {
  //   const args = Object.keys(data || {}).map((key) => `${key}=${data[key]}`).join(' ');
  //
  //   const time = formatDate(new Date(), 'HH:mm:ss');
  //
  //   this.requests.unshift([time, method, url.slice(URL.length), args].join(' '));
  // }

    this.eventosCadastrados = new CustomStore({
      key: 'id',
      load: () => this.sendRequest(this.url),
      update: (key, values) => {
        console.log(this.eventos)
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

