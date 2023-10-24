import {DatePipe} from "@angular/common";


export class DateUtils {

  static toLocaleDate(date, locate: 'pt-BR' | 'en' = 'pt-BR'): any  {
    const format: "dd/MM/yyyy" | "yyyy-MM-dd" = locate === 'pt-BR' ? 'dd/MM/yyyy' : 'yyyy-MM-dd';
    if(date){
      return new DatePipe(locate).transform(date, format, 'UTC');
    }
  }
}
