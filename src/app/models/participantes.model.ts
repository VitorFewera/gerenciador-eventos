import {ParticipanteModelBase} from "./participanteModelBase.model";

export class ParticipantesEventsModel extends ParticipanteModelBase{
  id?:number;
  idParticipante: string;
}

export class RootObject {
  participantes: ParticipantesEventsModel[];
}
