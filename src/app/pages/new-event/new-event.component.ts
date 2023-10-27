import {Component, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NewEventServiceAPI, Service} from "../../shared/services/new-event.service";
import {DxFormComponent} from "devextreme-angular";
import {EventsModel} from "../../models/events.model";
import {Router} from "@angular/router";
import {DateUtils} from "../../shared/pipe/date-utils";

@Component({
  selector: 'app-new-event',
  providers: [NewEventServiceAPI],
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})


export class NewEventComponent implements OnDestroy {

  constructor(private newEventServiceAPI: NewEventServiceAPI, private router: Router) {
    this.rules = {X: /[02-9]/};
    this.labelMode = 'floating';

  }


  ngAfterViewInit() {
    this.myform.instance.validate();
  }

  ngOnDestroy() {
    this.limpar();
  }

  @ViewChild(DxFormComponent, {static: false}) myform: DxFormComponent;

  eventService: NewEventServiceAPI;

  tiposEventos = [
    {id: 1, name: "tipo1"},
    {id: 2, name: "tipo2"},
    {id: 3, name: "tipo3"}
  ];

  rules: Object;

  labelMode: string;

  evento = new EventsModel();

  eventos: Array<EventsModel> = new Array<EventsModel>();



  cadastroEvento(evento: EventsModel) {
    const batatas = new Array<EventsModel>();
    const bata = new EventsModel();
    bata.dataEvento = this.evento.dataEvento;
    bata.nomeEvento = this.evento.nomeEvento;
    //bata.tipoEvento = this.evento.tipoEvento;

    this.eventos = [evento];
    batatas.push(bata);
    console.log('ARRAY AQUI', batatas)
    console.log('obj', bata);

    //evento.id = 3;
    evento.dataEvento = DateUtils.toLocaleDate(evento.dataEvento);
    //console.log('data', evento.dataEvento)
    this.newEventServiceAPI.cadastroEvento(evento).subscribe(
      () => {
        console.log('PASSOU', evento);
        this.sair();
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
