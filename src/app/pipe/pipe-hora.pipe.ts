import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeHora'
})
export class PipeHoraPipe implements PipeTransform {

  transform(value: number): string {
    // console.log(value);
    var retorno = "";
    switch (value) {
      case 8:
        retorno = '08:00';
        break;
      case 9:
        retorno = '09:00';
        break;
      case 10:
        retorno = '10:00';
        break;
      case 11:
        retorno = '11:00';
        break;
      case 12:
        retorno = '12:00';
        break;
      case 13:
        retorno = '13:00';
        break;
      case 14:
        retorno = '14:00';
        break;
      case 15:
        retorno = '15:00';
        break;
      case 16:
        retorno = '16:00';
        break;
      case 17:
        retorno = '17:00';
        break;
      case 18:
        retorno = '18:00';
        break;
      case 19:
        retorno = '19:00';
        break;
    }
    return retorno;
  }

}
