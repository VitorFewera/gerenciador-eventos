import {Component, enableProdMode, ChangeDetectionStrategy, OnInit} from '@angular/core';
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

  mostrarEvento: EventsModel[] ;

  customersData: any;

  tipoEventoData: any;

  refreshModes: string[];

  refreshMode: string;

  requests: string[] = [];

  private url = 'http://localhost:3000/eventos';

  constructor(private http: HttpClient) {

    this.refreshMode = 'reshape';
    this.refreshModes = ['full', 'reshape', 'repaint'];

    this.eventosCadastrados = new CustomStore({
      key: 'id',
      load: () => this.sendRequest(`${this.url}`),
      update: (key, values) => this.sendRequest(`${this.url}/`, 'PUT', {
        key,
        values: JSON.stringify(values),
      }),
      remove: (key) => this.sendRequest(`${this.url}/id`, 'DELETE', {
        key,
      }),
    });


    this.tipoEventoData = new CustomStore({
      key: 'tipoEvento',
      loadMode: 'raw',
      load: () => this.sendRequest(`${this.url}/tipoEvento`),
    });
  }

  sendRequest(url, method = 'GET', data: any = {}): any {
    this.logRequest(method, url, data);

    const httpParams = new HttpParams({fromObject: data});
    const httpOptions = {withCredentials: true, body: httpParams};
    let result;


    switch (method) {
      case 'GET':
        result = this.http.get(url);
        console.log('pegou o get: ', result)
        break;
      case 'PUT':
        result = this.http.put(url, httpParams, httpOptions);
        break;
      case 'POST':
        result = this.http.post(url, httpParams, httpOptions);
        break;
      case 'DELETE':
        result = this.http.delete(url, httpOptions);
        break;
    }
    console.log('dentro do sendResquest: ', result);

    return lastValueFrom(result)
      .then((data: any) => (method === 'GET' ? data.data : data))
      .catch((e) => {
        throw e && e.error && e.error.Message;
      });
  }

  logRequest(method: string, url: string, data: object): void {
    const args = Object.keys(data || {}).map((key) => `${key}=${data[key]}`).join(' ');

    const time = formatDate(new Date(), 'HH:mm:ss');

    this.requests.unshift([time, method, url.slice(URL.length), args].join(' '));
  }

  clearRequests() {
    this.requests = [];
  }


}
