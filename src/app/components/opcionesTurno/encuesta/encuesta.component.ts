import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  mensaje: string = '';
  error: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  
  Confirmar(opcion: boolean) {
    console.log(opcion);
    if (opcion) {
      if (this.mensaje != '') {
        // this.mensajeEvent.emit(this.mensaje);
        // this.OpcionEvent.emit(opcion);
      }
      else {
        console.log("error");
        this.error = "2";
      }
    }
    else {
      // this.OpcionEvent.emit(opcion);
      // this.mensajeEvent.emit(this.mensaje);
    }

  }

}
