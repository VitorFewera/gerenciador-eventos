import {ParticipantesModel} from "./participantes.model";

export class EventsModel {
  id:number;
  nomeEvento: string;
  tipoEvento: any;
  dataEvento: any;
  enderecoEvento: string;
  descricaoEvento: string;
  participantes: ParticipantesModel[];
}

export class RootObject {
   eventos: EventsModel[];
}

