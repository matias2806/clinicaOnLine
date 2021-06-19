import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTurnos'
})
export class FiltroTurnosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultTurnos = [];

    for (const turno of value) {
      // console.log(turno);

      if (turno.especialidad?.nombre!.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultTurnos.push(turno);
      }
      else {
        if (turno.profesional.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultTurnos.push(turno);
        }else{
          if (turno.paciente.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
            resultTurnos.push(turno);
          }
        }
      }

    }
    return resultTurnos
  }

}
