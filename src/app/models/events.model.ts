export class EventsModel {
  id:number;
  nomeEvento: string;
  tipoEvento: any;
  dataEvento: Date;
  enderecoEvento: string;
}

export class RootObject {
   eventos: EventsModel[];
}
