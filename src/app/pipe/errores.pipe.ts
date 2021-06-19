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
        retorno = 'Por favor ingrese la puntuacion de la atención';
        break;
      case "4":
        retorno = 'Por favor ingrese una opcion a si volveria a atender o si no';
        break;
      case "5":
        retorno = 'Por favor ingrese un comentario/mejora para que la clinica mejore, Muchas gracias!';
        break;
      case "6":
        retorno = 'Por favor ingrese una calificacion comentandonos como fue la atención recibida';
        break;
      case "9":
        retorno = 'error Atipico';
        break;
      case "11":
        retorno = 'Por favor ingrese una altura';
        break;
      case "12":
        retorno = 'Por favor ingrese un peso';
        break;
      case "13":
        retorno = 'Por favor ingrese una temperatura';
        break;
      case "14":
        retorno = 'Por favor ingrese una presion';
        break;

    }
    return retorno;
  }

}
