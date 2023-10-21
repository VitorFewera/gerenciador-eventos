export class EventsModel {
  id:number;
  nomeEvento: string;
  tipoEvento: any;
  dataEvento: any;
  enderecoEvento: string;
}

export class RootObject {
   eventos: EventsModel[];
}
