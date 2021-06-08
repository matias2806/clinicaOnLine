import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cancelar',
  templateUrl: './cancelar.component.html',
  styleUrls: ['./cancelar.component.scss']
})
export class CancelarComponent implements OnInit {


  @Output() OpcionEvent = new EventEmitter<boolean>();
  @Output() mensajeEvent = new EventEmitter<string>();
  mensaje: string = '';
  error: string = "";

  constructor() { }

  async ngOnInit() {
  }

  Confirmar(opcion: boolean) {
    console.log(opcion);
    if (opcion) {
      if (this.mensaje != '') {
        this.OpcionEvent.emit(opcion);
        this.mensajeEvent.emit(this.mensaje);
      }
      else {
        console.log("error");
        this.error = "1";
      }
    }
    else {
      this.OpcionEvent.emit(opcion);
      this.mensajeEvent.emit(this.mensaje);
    }

  }

}
