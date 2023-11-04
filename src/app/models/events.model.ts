export class EventsModel {
  id:number;
  nomeEvento: string;
  tipoEvento: any;
  dataEvento: any;
  enderecoEvento: string;
  descricaoEvento: string;

}

export class RootObject {
   eventos: EventsModel[];
}

