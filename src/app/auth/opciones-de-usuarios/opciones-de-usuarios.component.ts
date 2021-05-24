import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-opciones-de-usuarios',
  templateUrl: './opciones-de-usuarios.component.html',
  styleUrls: ['./opciones-de-usuarios.component.scss']
})
export class OpcionesDeUsuariosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  redirigir(tipoPerfil:string){
    this.router.navigate(['/register', tipoPerfil]);
  }
}
