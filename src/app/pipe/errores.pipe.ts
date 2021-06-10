import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errores'
})
export class ErroresPipe implements PipeTransform {

  transform(value: any): string {
    var retorno = "";
    switch (value) {
      case "1":
        retorno = 'Por favor ingrese la razón de la cancelación del turno!';
        break;
      case "2":
        retorno = 'Por favor ingrese un comentario/reseña de lo que fue el turno!';
        break;
      case "3":
        retorno = 'error Atipico';
        break;
    }
    return retorno;
  }

}
