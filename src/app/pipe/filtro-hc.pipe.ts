import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroHC'
})
export class FiltroHCPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultHC: any[] = [];

     for (const turno of value) {
       console.log(turno);
       resultHC.push(turno);

    //   if (turno.especialidad?.nombre!.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
    //     resultHC.push(turno);
    //   }
    //   else {
    //     if (turno.profesional.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
    //       resultHC.push(turno);
    //     }else{
    //       if (turno.paciente.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
    //         resultHC.push(turno);
    //       }
    //     }
    //   }

    }
    return resultHC;
  }

}
