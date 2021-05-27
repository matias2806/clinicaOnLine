import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Especialidad } from 'src/Models/Especialidad';
import { Usuario } from 'src/Models/Usuario';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  public especialidadElejida: any = null;
  public especialidadNombre: string = "";
  public listadoEspecialidades!: Especialidad[];

  public listadoUsuariosEspecialistas: Usuario[] = [];
  public listadoUsuariosEspecialistasCalificados: Usuario[] = [];
  public especialistaNombre: string = "";

  public fechaActual: Date | null = null;
  public listadoDias: Date[] = [];

  constructor(private fb: FormBuilder, private AuthSvc: AuthService, private router: Router, private _Uservice: UsuariosService, private _Eservice: EspecialidadService, private _Mservice: MensajesService) {
    this._Eservice.traerTodos().subscribe((especialidad: Especialidad[]) => {
      this.listadoEspecialidades = especialidad;
    });;

    this._Uservice.obtenerEspecialistas().subscribe(data => {
      this.listadoUsuariosEspecialistas = data;
    })
  }

  ngOnInit(): void {

  }

  pedirTurno() {
    if (this.especialidadNombre == "" && this.especialistaNombre == "") {
      this._Mservice.mensajeError("Por favor seleccione tanto una especialidad como un especialista para sacar su turno");
    }
    if (this.especialidadNombre != "" && this.especialistaNombre == "") {
      this._Mservice.mensajeError("Por favor seleccione un especialista para sacar su turno");
    }
    if (this.especialidadNombre != "" && this.especialistaNombre != "") {
      this._Mservice.mensajeExitoso("Seleccione que dia y en que horario quiere ser atendido");
      this.cargarListaDeTurnos();
    }
    // console.log(this.especialidadNombre);
    // console.log(this.especialistaNombre);
  }

  cargarListaDeTurnos() {
    this.cargar15dias();
    // console.log("entra");
  }



  onChangeEspecialidad(data: any) {
    // console.log(this.especialidadNombre);
    this.listadoUsuariosEspecialistasCalificados = [];

    this._Eservice.traerPorNombre(this.especialidadNombre).then(esp => {
      if (esp) {
        this.especialidadElejida = esp;
        // console.log( this.especialidadElejida);
      }
    });
    this.filtrarListaEspecialistas();
  }

  onChangeEspecialista(data: any) {
    // console.log(this.especialistaNombre);
  }

  filtrarListaEspecialistas() {
    this.listadoUsuariosEspecialistas.forEach(especilista => {
      especilista.especialidades?.forEach(especialidad => {
        // console.log(especialidad.nombre);
        if (especialidad.nombre == this.especialidadNombre) {
          this.listadoUsuariosEspecialistasCalificados.push(especilista);
        }
      });
    });
    // console.log(this.listadoUsuariosEspecialistasCalificados);
  }

  cargar15dias() {
    var fecha1 = new Date(Date.now());
    var fecha2 = new Date(Date.now());
    var fecha3 = new Date(Date.now());
    var fecha4 = new Date(Date.now());
    var fecha5 = new Date(Date.now());
    var fecha6 = new Date(Date.now());
    var fecha7 = new Date(Date.now());
    var fecha8 = new Date(Date.now());
    var fecha9 = new Date(Date.now());
    var fecha10 = new Date(Date.now());
    var fecha11= new Date(Date.now());
    var fecha12 = new Date(Date.now());
    var fecha13 = new Date(Date.now());
    var fecha14 = new Date(Date.now());
    var fecha15 = new Date(Date.now());
    
    fecha2.setDate(fecha2.getDate() + 1);
    fecha3.setDate(fecha3.getDate() + 2);
    fecha4.setDate(fecha4.getDate() + 3);
    fecha5.setDate(fecha5.getDate() + 4);
    fecha6.setDate(fecha6.getDate() + 5);
    fecha7.setDate(fecha7.getDate() + 6);
    fecha8.setDate(fecha8.getDate() + 7);
    fecha9.setDate(fecha9.getDate() + 8);
    fecha10.setDate(fecha10.getDate() + 9);
    fecha11.setDate(fecha11.getDate() + 10);
    fecha12.setDate(fecha12.getDate() + 11);
    fecha13.setDate(fecha13.getDate() + 12);
    fecha14.setDate(fecha14.getDate() + 13);
    fecha15.setDate(fecha15.getDate() + 14);

    this.listadoDias.push(fecha1);
    this.listadoDias.push(fecha2);
    this.listadoDias.push(fecha3);
    this.listadoDias.push(fecha4);
    this.listadoDias.push(fecha5);
    this.listadoDias.push(fecha6);
    this.listadoDias.push(fecha7);
    this.listadoDias.push(fecha8);
    this.listadoDias.push(fecha9);
    this.listadoDias.push(fecha10);
    this.listadoDias.push(fecha11);
    this.listadoDias.push(fecha12);
    this.listadoDias.push(fecha13);
    this.listadoDias.push(fecha14);
    this.listadoDias.push(fecha15);

    console.log( this.listadoDias);
  }
}
