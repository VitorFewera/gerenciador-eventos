import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdmEventService {

  ID: number;

  Head_ID: number;

  Nome_completo: string;

  Setor: string;

  Acompanhantes: string;

}

const employees: AdmEventService[] = [{
  ID: 1,
  Head_ID: 0,
  Nome_completo: 'LÚCAS ROÇHA',
  Setor: 'SIA',
  Acompanhantes: 'O',
}, {
  ID: 2,
  Head_ID: 0,
  Nome_completo: 'ANA GENOVA',
  Setor: 'SIA',
  Acompanhantes: '0',
}, {
  ID: 3,
  Head_ID: 0,
  Nome_completo: 'ANDRE L. DIAS',
  Setor: 'SIA',
  Acompanhantes: '0',
}, {
  ID: 4,
  Head_ID: 0,
  Nome_completo: 'ARTHUR RODRIGUES',
  Setor: 'SIA',
  Acompanhantes: '2',
}, {
  ID: 5,
  Head_ID: 4,
  Nome_completo: 'MATEUS VICENTE ROCHA',
  Setor: 'SIA',
  Acompanhantes: null,
}, {
  ID: 6,
  Head_ID: 4,
  Nome_completo: 'GUILHERME PORTO',
  Setor: 'SIA',
  Acompanhantes: null,
}, {
  ID: 7,
  Head_ID: 0,
  Nome_completo: 'JAILTON MARQUES',
  Setor: 'REPRESENTANTE',
  Acompanhantes: '0',
}, {
  ID: 8,
  Head_ID: 0,
  Nome_completo: 'RUBENS SIP',
  Setor: 'SIP',
  Acompanhantes: '2',
}, {
  ID: 9,
  Head_ID: 8,
  Nome_completo: 'JOSÉ JÚLIO MARANHÃO',
  Setor: 'SIP',
  Acompanhantes: null,
}, {
  ID: 10,
  Head_ID: 8,
  Nome_completo: 'EUDES HENRIQUE PAZ',
  Setor: 'SIP',
  Acompanhantes: null,
}];

@Injectable()
export class ServiceEventAdm {
  getEmployees(): AdmEventService[] {
    return employees;
  }
}
