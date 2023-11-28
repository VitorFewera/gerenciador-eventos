import {Component, enableProdMode, OnInit} from '@angular/core';
import {AdmEventService} from "../../shared/services/adm-event.service";
import {EventsModel} from "../../models/events.model";
import {
  HttpClient, HttpClientModule, HttpHeaders, HttpParams,
} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { formatDate } from 'devextreme/localization';

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

  dataSource: any;

  customersData: any;

  tipoEventoData: any;

  refreshModes: string[];

  refreshMode: string;

  requests: string[] = [];

  constructor(private http: HttpClient) {
    const url = 'http://localhost:3000/eventos'

    this.refreshMode = 'reshape';
    this.refreshModes = ['full', 'reshape', 'repaint'];

    this.dataSource = new CustomStore({
      key: '/id',
      load: () => this.sendRequest(`${url}`).catch(error => console.log(error)),
      insert: (values) => this.sendRequest(`${URL}/InsertOrder`, 'POST', {
        values: JSON.stringify(values),
      }),
      update: (key, values) => this.sendRequest(`${URL}/UpdateOrder`, 'PUT', {
        key,
        values: JSON.stringify(values),
      }),
      remove: (key) => this.sendRequest(`${URL}/DeleteOrder`, 'DELETE', {
        key,
      }),
    });


    this.tipoEventoData = new CustomStore({
      key: 'tipoEvento',
      loadMode: 'raw',
      load: () => this.sendRequest(`${URL}/tipoEvento`),
    });
  }

  sendRequest(url: string, method = 'GET', data: any = {}): any {
    this.logRequest(method, url, data);

    const httpParams = new HttpParams({ fromObject: data });
    const httpOptions = { withCredentials: true, body: httpParams };
    let result;

    switch (method) {
      case 'GET':
        result = this.http.get(url, httpOptions);
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
