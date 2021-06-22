import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as ChartJs from 'chart.js';
import { chart } from 'highcharts';
import { ArchivosService } from 'src/app/services/Archivos/archivos.service';
import { LogUsuariosService } from 'src/app/services/LogUsuarios/log-usuarios.service';
import { LogUsuario } from 'src/Models/LogUsuario';



@Component({
  selector: 'app-page-graficos',
  templateUrl: './page-graficos.component.html',
  styleUrls: ['./page-graficos.component.scss']
})
export class PageGraficosComponent implements OnInit {

  logsUsuarios: LogUsuario[] = [];

  constructor(private _Aservice: ArchivosService, private _Lservice: LogUsuariosService) {
  }

  async ngOnInit() {
    this._Lservice.traerTodos().subscribe((logs: LogUsuario[]) => {
      this.logsUsuarios = logs;
    });
  }


  grafico(numero: number) {
  }

  cargarGrafico1() {
  }

  descargar(numero: number) {
    switch (numero) {
      case 1:
        // this.armarExcel1();
        this._Aservice.exportAsExcelFile(this.armarExcel1(), 'LogsUsuarios');
        break;
      // case 2:
      //   this.fileService.exportAsExcelFile(this.preparaParaDescargar(this.datachart2),'cantOperaciones');
      //   break;
      // case 3:
      //   this.fileService.exportAsExcelFile(this.preparaParaDescargar(this.datachart3),'turnosXDia');
      //   break;
      // case 4:
      //   this.fileService.exportAsExcelFile(this.preparaParaDescargar(this.datachart4),'medicosxTurno');
      //   break;
      // case 5:
      //   this.fileService.exportAsExcelFile(this.preparaParaDescargar(this.datachart5),'medicosXDia');
      //   break;
    }
  }

  armarExcel1() {
    let logs: any[] = []
    this.logsUsuarios.forEach(log => {
      var aux = new Date(log.fecha);
      logs.push({ IdDelLog: log.id, Usuario: log.emailUsuario, Fecha: aux.toLocaleString() });
    });
    return logs;
  }


}
