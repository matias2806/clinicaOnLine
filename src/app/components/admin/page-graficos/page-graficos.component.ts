import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Chart } from 'chart.js';
import * as ChartJs from 'chart.js';
import { chart } from 'highcharts';
import { ArchivosService } from 'src/app/services/Archivos/archivos.service';
import { LogUsuariosService } from 'src/app/services/LogUsuarios/log-usuarios.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { Chart } from 'angular-highcharts';
import { LogUsuario } from 'src/Models/LogUsuario';
import { Turno } from 'src/Models/Turno';
import { DatoGrafico, DatoGraficoPie, DatoGrafico2, DatoGrafico3, auxiliar } from 'src/Models/Graficos';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { Especialidad } from 'src/Models/Especialidad';


@Component({
  selector: 'app-page-graficos',
  templateUrl: './page-graficos.component.html',
  styleUrls: ['./page-graficos.component.scss']
})
export class PageGraficosComponent implements OnInit {

  public logsUsuarios: LogUsuario[] = [];
  public listadoTurnos: Turno[] = [];
  public listadoEspecialidad: Especialidad[] = [];


  uno: boolean = false;
  dos: boolean = false;
  tres: boolean = false;
  cuatro: boolean = false;
  cinco: boolean = false;
  chart2: Chart = new Chart;
  chart3: Chart = new Chart;
  chart4: Chart = new Chart;
  chart5: Chart = new Chart;
  datachart2: any[] = [];
  datachart3: any[] = [];
  datachart4: any[] = [];
  datachart5: any[] = [];

  constructor(private _Aservice: ArchivosService, private _Lservice: LogUsuariosService, private _Tservice: TurnosService, private _Eservice: EspecialidadService) {
  }

  async ngOnInit() {
    this._Lservice.traerTodos().subscribe((logs: LogUsuario[]) => {
      this.logsUsuarios = logs;
    });

    this._Eservice.traerTodos().subscribe((esp: Especialidad[]) => {
      this.listadoEspecialidad = esp;
    });

    this._Tservice.traerTodos().subscribe((turnos: Turno[]) => {
      this.listadoTurnos = turnos;
      this.armaInfo2();
      this.preparachart3(turnos);
    });

  }

  contains(lista: string | any[], dato: any) {
    let indice = -1;
    for (let index = 0; index < lista.length; index++) {
      if (lista[index].name == dato) {
        indice = index;
      }
    }
    return indice;
  }

  contains3(lista: string | any[], dato: any) {
    let indice = -1;
    for (let index = 0; index < lista.length; index++) {
      if (lista[index].name == dato) {
        indice = index;
      }
    }
    return indice;
  }

  ver(numero: number) {
    switch (numero) {
      case 2:
        this.armarchart2();
        this.uno = false;
        this.dos = true;
        this.tres = false;
        this.cuatro = false;
        this.cinco = false;
        break;
      case 3:
        this.armarchart3();
        this.uno = false;
        this.dos = false;
        this.tres = true;
        this.cuatro = false;
        this.cinco = false;
        break;
      // case 4:
      //   this.armarchart4();
      //   this.dos = false;
      //   this.tres = false;
      //   this.cuatro = !this.cuatro;
      //   this.cinco = false;
      //   break;
      // case 5:
      //   this.armarchart5();
      //   this.dos = false;
      //   this.tres = false;
      //   this.cuatro = false;
      //   this.cinco = !this.cinco;
      //   break;
      default:
        this.uno = false;
        this.dos = false;
        this.tres = false;
        this.cuatro = false;
        this.cinco = false;
        break;
    }
  }
  descargar(numero: number) {
    switch (numero) {
      case 1:
        this._Aservice.exportAsExcelFile(this.armarExcel1(), 'LogsUsuarios');
        break;
      case 2:
        this._Aservice.exportAsExcelFile(this.preparaParaDescargar(this.datachart2), 'cantOperaciones');
        break;
      case 3:
        this._Aservice.exportAsExcelFile(this.preparaParaDescargar(this.datachart3), 'turnosXDia');
        break;
    }
  }

  preparaParaDescargar(lista: any[]) {
    return lista.map(dato => {
      return { name: dato.name, data: dato.data[0] }
    })
  }

  armarExcel1() {
    let logs: any[] = []
    this.logsUsuarios.forEach(log => {
      var aux = new Date(log.fecha);
      logs.push({ IdDelLog: log.id, Usuario: log.emailUsuario, Fecha: aux.toLocaleString() });
    });
    return logs;
  }


  armarchart3() {
    this.chart3 = new Chart({
      chart: {
        renderTo: 'container',
        type: 'column'
      },
      title: {
        text: 'Turnos por dia'
      },
      xAxis: {
        categories: ['Dias']

      },
      yAxis: {
        title: {
          text: 'Cantidad Turnos'
        },
        tickInterval: 1
      },
      series: this.datachart3.sort((a, b) => {
        const dateA = new Date(a.fecha);
        const dateB = new Date(b.fecha);
        if (dateA < dateB) {
          return -1
        } else {
          return 0
        }
      })
    });
  }

  preparachart3(resp: any[]) {
    this.listadoTurnos.forEach(dato => {
      if (this.contains3(this.datachart3, dato.fecha) == -1) {
        this.datachart3.push(new DatoGrafico(dato.fecha, [1]));
      } else {
        this.datachart3[this.contains3(this.datachart3, dato.fecha)].data[0]++;
      }
    })
  }


  //COSAS DEL 2DO BOTON
  armaInfo2() {
    this.listadoTurnos.forEach(turno => {
      if (this.contains(this.datachart2, turno.especialidad!.nombre) == -1) {
        this.datachart2.push(new DatoGrafico2(turno.especialidad!.nombre, [1]));
      } else {
        this.datachart2[this.contains(this.datachart2, turno.especialidad!.nombre)].data[0]++;
      }
    });
  }
  armaData2() {
    var b: any[] = [];
    var arrayEspe: string[] = [];
    this.listadoEspecialidad.forEach(esp => {
      arrayEspe.push(esp.nombre);
    });

    arrayEspe.forEach(nombreEsp => {
      var info: any;
      info = {
        name: nombreEsp,
        y: 0,
      }
      this.listadoTurnos.forEach(turno => {
        if (turno.especialidad!.nombre == nombreEsp) {
          info.y++;
        }
      });
      b.push(info);

    });
    return b;
  }
  armarchart2() {
    var info = this.armaData2();
    // console.log(info);

    this.chart2 = new Chart({
      chart: {
        renderTo: 'container',
        type: 'pie'
      },
      title: {
        text: 'Cantidad de Turnos por especialidad. '
      },
      series: [{
        type: 'pie',
        name: 'graf',
        data: info
      }]
    });
  }

  // armaData4() {
  //   var b: any[] = [];
  //   var a: any;
  //   var c: any;
  //   a = {
  //     name: 'coca',
  //     y: 15,
  //   }
  //   c = {
  //     name: 'pepsi',
  //     y: 25,
  //   }
  //   b.push(a);
  //   b.push(c);
  //   return b;
  // }
  //COSAS DEL 2DO BOTON




}
