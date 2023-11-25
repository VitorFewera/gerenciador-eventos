import {Component, OnInit} from '@angular/core';
import {AdmEventService} from "../../shared/services/adm-event.service";
import {EventsModel} from "../../models/events.model";
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

@Component({
  selector: 'app-adm-event',
  providers: [AdmEventService],
  templateUrl: './adm-event.component.html',
  styleUrls: ['./adm-event.component.scss']
})
export class AdmEventComponent implements OnInit {
  eventosCadastrados: any;

  evento: EventsModel = new EventsModel();

  constructor(private service: AdmEventService) {
    const apiEventos: string = 'http://localhost:3000/eventos'

    this.eventosCadastrados = AspNetData.createStore({
      key: 'id',
      loadUrl: `${apiEventos}`,
      updateUrl: `${apiEventos}/`,
      deleteUrl: `${apiEventos}/`,
      onBeforeSend(method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
      },
    });
  }

  ngOnInit() {

  }



  editorPreparing(e) {
    if (e.dataField === 'Head_ID' && e.row.data.ID === 1) {
      e.cancel = true;
    }
  }
}
