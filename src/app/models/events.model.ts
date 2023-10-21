export class EventsModel {
  id:number;
  name: string;
  tipoEvento: string;
  dataEvento: string;
  enderecoEvento: string;
  liberadoEvento: string;
  //acompanhanteEvento: boolean;
  //doacaoEvento: boolean;
}

export class RootObject {
   eventos: EventsModel[];
}
