import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  @Output() encuestaEvent = new EventEmitter<any>();
  mensaje: string = '';
  volveria: string = 'SI';
  clasificacion: string = '1';
  error: string = "";

  constructor() { }

  ngOnInit(): void {
  }


  Confirmar(opcion: boolean) {
    var aux = {
      atencionRecibida: this.clasificacion,
      volveria: this.volveria,
      sugerenciaMejora: this.mensaje,
      opcion: opcion
    }
    console.log(aux);

    if (opcion) {
      if (this.clasificacion != '1' && this.clasificacion != '2' && this.clasificacion != '3' && this.clasificacion != '4' && this.clasificacion != '5') {
        this.error = "3"
      }
      else {
        if (this.volveria != 'SI' && this.volveria != 'NO') {
          this.error = "4"
        } else {
          if(this.mensaje == ''){
            this.error = "5";
          }
          else{
            this.encuestaEvent.emit(aux);
          }
        }
      }
    }
    else{
      this.encuestaEvent.emit(aux);
    }
  }



}
