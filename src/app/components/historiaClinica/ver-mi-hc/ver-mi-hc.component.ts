import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriaClinica } from 'src/Models/HistoriaClinica';

@Component({
  selector: 'app-ver-mi-hc',
  templateUrl: './ver-mi-hc.component.html',
  styleUrls: ['./ver-mi-hc.component.scss']
})
export class VerMiHCComponent implements OnInit {
  @Input() hc: HistoriaClinica | undefined;
  @Output() volverHCEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  volver(){
    this.volverHCEvent.emit(true);
  }
  
}
