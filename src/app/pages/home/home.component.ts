import {Component, OnInit} from '@angular/core';
import {NewEventServiceAPI, Service} from "../../shared/services/new-event.service";

import {Router, RouterModule} from "@angular/router";
import {EventsModel} from "../../models/events.model";

@Component({
  templateUrl: 'home.component.html',
  providers: [NewEventServiceAPI, Service],
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  cardEvento: EventsModel = new EventsModel();

  mostrarEvento: EventsModel[] = [];

  participarEvento: any;

  tipo: number;

  popupVisible = false;

  fecharPopup: any;

  constructor(private service: NewEventServiceAPI, private router: Router) {

    const that = this;

    let participar: boolean = false;

    this.participarEvento = {
      text: 'Participar',
      onClick(e) {
        return participar = true;
      }
    }

    this.fecharPopup = {
      text: 'Fechar',
      OnClick(e) {
        console.log(e)
        that.popupVisible = false;
      },
    };
  }

  ngOnInit(): void {
    this.service.retornoEvento().subscribe((evento: EventsModel[]) => {
      console.log(evento);
      this.mostrarEvento = evento
    })
  }

  popup(eventoSelecionado: any) {
    this.cardEvento = eventoSelecionado;
    console.log(eventoSelecionado)
    this.popupVisible = true;
  }

  administrar(){
    this.router.navigate(['/adm-event']);
  }

}
