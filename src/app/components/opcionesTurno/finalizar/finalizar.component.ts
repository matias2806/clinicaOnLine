import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.scss']
})
export class FinalizarComponent implements OnInit {

  @Output() OpcionEvent = new EventEmitter<boolean>();
  @Output() mensajeEvent = new EventEmitter<string>();
  mensaje: string = '';
  error: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  Confirmar(opcion: boolean) {
    console.log(opcion);
    if (opcion) {
      if (this.mensaje != '') {
        this.mensajeEvent.emit(this.mensaje);
        this.OpcionEvent.emit(opcion);
      }
      else {
        console.log("error");
        this.error = "2";
      }
    }
    else {
      this.OpcionEvent.emit(opcion);
      this.mensajeEvent.emit(this.mensaje);
    }

  }
}
