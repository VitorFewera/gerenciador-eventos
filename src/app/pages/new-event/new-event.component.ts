import {Component, OnInit, ViewChild} from '@angular/core';
import {NewEventServiceAPI, Service} from "../../shared/services/new-event.service";
import {DxFormComponent} from "devextreme-angular";
import DevExpress from "devextreme";
import data = DevExpress.data;
import {EventsModel} from "../../models/events.model";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-new-event',
  providers: [Service],
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})


export class NewEventComponent {
  @ViewChild(DxFormComponent, {static: false}) myform: DxFormComponent;

  eventService: NewEventServiceAPI;

  tiposEventos: string[];

  participanteEventos: string[];

  rules: Object;

  labelMode: string;

  evento: EventsModel;


  constructor(eventService: Service, private router: Router) {
    this.participanteEventos = eventService.getParticipantesEventos();
    // this.eventService = eventService.getNewEventService();
    this.tiposEventos = eventService.getTipoEvento();
    this.rules = {X: /[02-9]/};
    this.labelMode = 'floating';
 }
 /*
   id: number = 0;
  nameEvento: string = '';
  tipoEvento: string = '';
  dataEvento: string = '';
  enderecoEvento: string = '';
  liberadoEvento: string = '';
  acompanhanteEvento: boolean = false;
  doacaoEvento: boolean = false;

  evento: EventsModel = {
    id: this.id,
    name: this.nameEvento,
    tipoEvento: this.tipoEvento,
    dataEvento: this.dataEvento,
    enderecoEvento: this.enderecoEvento,
    liberadoEvento: this.liberadoEvento,
    acompanhanteEvento: this.acompanhanteEvento,
    doacaoEvento: this.doacaoEvento,
  }
*/

  cadastroEvento(): void {
    console.log(this.evento);
    this.eventService.cadastroEvento(this.evento).subscribe({
        next: resultado => console.log('PASSOU', resultado),
        error: err => console.error('erro',err),
      });
  }

  ngAfterViewInit() {
    this.myform.instance.validate();
  }

  ngOnInit(): void {
   // this.evento.acompanhanteEvento = false;
  //  this.evento.doacaoEvento = false;
  }

}
