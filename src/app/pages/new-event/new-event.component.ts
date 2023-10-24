import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NewEventServiceAPI, Service} from "../../shared/services/new-event.service";
import {DxFormComponent} from "devextreme-angular";
import {EventsModel} from "../../models/events.model";
import {Router} from "@angular/router";
import {DateUtils} from "../../shared/pipe/date-utils";


@Component({
  selector: 'app-new-event',
  providers: [Service],
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})


export class NewEventComponent implements OnInit, OnDestroy {


  ngAfterViewInit() {
    this.myform.instance.validate();
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.limpar();
  }

  @ViewChild(DxFormComponent, {static: false}) myform: DxFormComponent;

  eventService: NewEventServiceAPI;

  tiposEventos = [
    {id: 1, name: "tipo1"},
    {id: 1, name: "tipo2"},
    {id: 1, name: "tipo3"}
  ];

  participantesEventos = [
    {id: 1, name: 'Aberto para o setor'},
    {id: 2, name: 'Aberto para o Alojamento'},
    {id: 3, name: 'Aberto para todos os setores'},
    {id: 4, name: 'Institucional'},
    {id: 5, name: 'vou adicionar depois'}
  ];

  rules: Object;

  labelMode: string;

  evento = new EventsModel();


  constructor(eventService: Service, private router: Router) {
    this.rules = {X: /[02-9]/};
    this.labelMode = 'floating';

  }

  cadastroEvento(evento: EventsModel) {
    evento.dataEvento = new Date(evento.dataEvento);
    evento.dataEvento = DateUtils.toLocaleDate(evento.dataEvento);
    console.log(evento);
    this.eventService.cadastroEvento(evento).subscribe(
      () => {
        console.log('PASSOU', evento);
        this.router.navigate(['/home']);
      });
  }

  sair() {
    this.router.navigate(['/home'])
  }

  limpar(){
    this.evento.nomeEvento = '';
    this.evento.enderecoEvento = '';
    this.evento.tipoEvento = null;
    this.evento.dataEvento = null;
  }

}
