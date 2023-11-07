export class ParticipantesModel{
  id:number;
  nome: string;
  setor: any
}

export class RootObject {
  participantes: ParticipantesModel[];
}
