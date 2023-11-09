import {ParticipanteModelBase} from "./participanteModelBase.model";

export class ParticipantesEventsModel extends ParticipanteModelBase{
  id?:number;
  idParticipante: number;
}

export class RootObject {
  participantes: ParticipantesEventsModel[];
}
