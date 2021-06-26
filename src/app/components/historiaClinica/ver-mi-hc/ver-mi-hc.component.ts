import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriaClinica } from 'src/Models/HistoriaClinica';

@Component({
  selector: 'app-ver-mi-hc',
  templateUrl: './ver-mi-hc.component.html',
  styleUrls: ['./ver-mi-hc.component.scss']
})
export class VerMiHCComponent implements OnInit {
  @Input() hc: HistoriaClinica | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log(this.hc!);
  }

}
