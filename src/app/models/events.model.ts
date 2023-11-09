import {ParticipantesEventsModel} from "./participantes.model";

export class EventsModel {
  id:number;
  nomeEvento: string;
  tipoEvento: any;
  dataEvento: any;
  enderecoEvento: string;
  descricaoEvento: string;
  participantes: ParticipantesEventsModel[];

  constructor() {
    this.participantes = new Array<ParticipantesEventsModel>();
  }
 }



export class RootObject {
   eventos: EventsModel[];

}

