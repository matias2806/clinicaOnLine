import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.component.html',
  styleUrls: ['./calificar.component.scss']
})
export class CalificarComponent implements OnInit {
  
  @Output() calificacionEvent = new EventEmitter<any>();
  mensaje: string = '';
  error: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  Confirmar(opcion: boolean) {
    console.log(opcion);
    var aux = {
      mensajeCalificacion: this.mensaje,
      opcion: opcion
    }
    
    if (opcion) {
      if (this.mensaje != '') {
        this.calificacionEvent.emit(aux);
      }
      else {
        console.log("error");
        this.error = "6";
      }
    }
    else {
      this.calificacionEvent.emit(aux);
    }

  }
}
