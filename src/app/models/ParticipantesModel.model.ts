import {ParticipanteModelBase} from "./participanteModelBase.model";

export class ParticipantesModel extends ParticipanteModelBase{
  id: number;
  user: string;
  password: string;
}
