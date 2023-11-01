import {Component, OnInit} from '@angular/core';
import {NewEventServiceAPI, Service} from "../../shared/services/new-event.service";

import {RouterModule} from "@angular/router";
import {EventsModel} from "../../models/events.model";

@Component({
  templateUrl: 'home.component.html',
  providers: [NewEventServiceAPI, Service],
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  cardEvento: EventsModel;

  mostrarEvento: EventsModel[] = [];

  participarEvento: any;

  tipo: number;

  constructor(private service: NewEventServiceAPI, private router: RouterModule) {

    let participar: boolean = false;
    this.participarEvento = {
      text: 'Participar',
      onClick(e) {
        return participar = true;
      }
    }
  }

  ngOnInit(): void {
    this.service.retornoEvento().subscribe((evento: EventsModel[]) => {
      console.log(evento);
      this.mostrarEvento = evento
    })
  }

}
