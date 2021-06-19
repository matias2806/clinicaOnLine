import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTurnosProfesional'
})
export class FiltroTurnosProfesionalPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultTurnos = [];

    for (const turno of value) {
      // console.log(turno);
      resultTurnos.push(turno);
      if (turno.paciente!.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultTurnos.push(turno);
      }
      else {
        if (turno.especialidad?.nombre!.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultTurnos.push(turno);
        }
      }

    }
    return resultTurnos
  }

}
