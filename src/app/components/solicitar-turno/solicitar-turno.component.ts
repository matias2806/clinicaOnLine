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

  cargar15dias() {
    var fecha = new Date(Date.now());
    var fecha2 = new Date(Date.now());
    this.listadoDias.push(fecha);
    console.log( this.listadoDias);
  
    fecha2.setDate(fecha2.getDate() + 1);
    this.listadoDias.push(fecha2);
    console.log( this.listadoDias);
    // console.log( fecha);
    // for (let i = 0; i < 15; i++) {
    //   this.listadoDias.push(fecha);
    //   fecha.setDate(fecha2.getDate() + 1);
    // }

    
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

}
