import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NewEventServiceAPI} from "../../shared/services/new-event.service";
import {DxFormComponent, DxValidatorComponent} from "devextreme-angular";
import {EventsModel} from "../../models/events.model";
import {Router} from "@angular/router";


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
  @ViewChild('targetValidator', {static: false}) validator: DxValidatorComponent;

  eventService: NewEventServiceAPI;

  tiposEventos = [
    {id: 1, name: "Esportes Vôlei/Beach Tennis"},
    {id: 2, name: "Churrasco"},
    {id: 3, name: "Diversos"}
  ];

  rules: Object;

  labelMode: string;

  evento = new EventsModel();

  formData = {};

  cadastroEvento(evento: EventsModel) {
    if (!this.myform.instance.validate().isValid) {
      return
    }
    this.newEventServiceAPI.cadastroEvento(evento).subscribe(
      () => {
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
    this.evento.descricaoEvento = '';
  }

}
