import {Component, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NewEventServiceAPI, Service} from "../../shared/services/new-event.service";
import {DxFormComponent, DxValidatorComponent} from "devextreme-angular";
import {EventsModel} from "../../models/events.model";
import {Router} from "@angular/router";
import {DateUtils} from "../../shared/pipe/date-utils";

@Component({
  selector: 'app-new-event',
  providers: [NewEventServiceAPI],
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})


export class NewEventComponent implements OnDestroy, OnInit {

  ngOnInit() {
    this.limpar();
  }

  constructor(private newEventServiceAPI: NewEventServiceAPI, private router: Router) {
    this.rules = {X: /[02-9]/};
    this.labelMode = 'floating';

  }
  ngOnDestroy() {
    this.limpar();
  }

  @ViewChild(DxFormComponent, {static: false}) myform: DxFormComponent;
  @ViewChild('targetValidator', { static: false }) validator: DxValidatorComponent;

  eventService: NewEventServiceAPI;

  tiposEventos = [
    {id: 1, name: "Esportes Vôlei/Beach Tennis"},
    {id: 2, name: "Churrasco"},
    {id: 3, name: "Diversos"}
  ];

  rules: Object;

  labelMode: string;

  evento = new EventsModel();

  eventos: Array<EventsModel> = new Array<EventsModel>();

  formData = {};


  cadastroEvento(evento: EventsModel) {

    //Fazer com que os campo do formulario venha sem validação
    if (!this.myform.instance.validate().isValid) {
      return
    }

   // evento.dataEvento = DateUtils.toLocaleDate(evento.dataEvento);

    this.newEventServiceAPI.cadastroEvento(evento).subscribe(
      () => {
        console.log('PASSOU', evento);
        this.sair();
      });
  }

  sair() {
    this.router.navigate(['/home'])
  }

  limpar() {
    this.evento.nomeEvento = '';
    this.evento.enderecoEvento = '';
    this.evento.tipoEvento = null;
    this.evento.dataEvento = null;
  }

}
