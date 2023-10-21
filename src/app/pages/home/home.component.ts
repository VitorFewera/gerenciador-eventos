import {Component, OnInit} from '@angular/core';
import { NewEventServiceAPI, Service} from "../../shared/services/new-event.service";

import {RouterModule} from "@angular/router";
import {EventsModel} from "../../models/events.model";

@Component({
  templateUrl: 'home.component.html',
  providers:[NewEventServiceAPI, Service],
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit{

  cardEvento: EventsModel  ;

  certezaMostrarEvento: EventsModel[] = [];

  mostrarEvento: EventsModel[] = [];

  popupVisible = false;

  participarEvento: any;

  positionOf: string;

  constructor(private service: NewEventServiceAPI) {

    let participar: boolean = false;
    this.participarEvento = {
      text: 'Participar',
      onClick(e){
        return participar = true;
        //this.router.navigate(['/event-manager']);
      }
    }
  }


  ngOnInit():void {
    this.service.retornoEvento().subscribe((evento: EventsModel[]) =>
    { console.log(evento); this.mostrarEvento = evento
    })}

/*
  retornoEvento(): void{
  this.service.retornoEvento().subscribe({
    next: evento => {
        this.mostrarEvento = evento;
        this.certezaMostrarEvento = this.mostrarEvento;
    },
    error:err => console.log(err)
  });
  }*/




  showInfo(evento) {
    this.cardEvento = evento;
    this.popupVisible = true;
  }



}
