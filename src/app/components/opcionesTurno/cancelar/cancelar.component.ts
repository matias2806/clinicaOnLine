import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/Models/Turno';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cancelar',
  templateUrl: './cancelar.component.html',
  styleUrls: ['./cancelar.component.scss']
})
export class CancelarComponent implements OnInit {

  @Output() OpcionEvent = new EventEmitter<boolean>();
  @Output() mensajeEvent = new EventEmitter<string>();
  mensaje:string = '';
  error:string = "";

  constructor( ) { }

  ngOnInit(): void {
  }

  Confirmar(opcion:boolean){
    if(this.mensaje != ''){
      this.OpcionEvent.emit(opcion);
      this.mensajeEvent.emit(this.mensaje);
    }
    else{
      console.log("error");
      this.error = "1";
    }
  }

}
