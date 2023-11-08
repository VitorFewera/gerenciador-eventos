import {ParticipantesModel} from "./participantes.model";

export class EventsModel {
  id:number;
  nomeEvento: string;
  tipoEvento: any;
  dataEvento: any;
  enderecoEvento: string;
  descricaoEvento: string;
  participantes: [{nome: string, setor: any}];
 }



export class RootObject {
   eventos: EventsModel[];

}

