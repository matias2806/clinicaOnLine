import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoriaClinica } from 'src/Models/HistoriaClinica';

@Component({
  selector: 'app-detalle-hc',
  templateUrl: './detalle-hc.component.html',
  styleUrls: ['./detalle-hc.component.scss']
})
export class DetalleHCComponent implements OnInit {
  @Input()hc!:HistoriaClinica;
  
  constructor() { }

  ngOnInit(): void {
  }

}
