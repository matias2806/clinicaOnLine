import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Dia } from 'src/Models/Dia';
import { Especialidad } from 'src/Models/Especialidad';
import { Turno } from 'src/Models/Turno';
import { Usuario } from 'src/Models/Usuario';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  public usuarioRegistrado: Usuario | null = null;

  public especialidadElejida: any = null;
  public especialidadNombre: string = "";
  public listadoEspecialidades!: Especialidad[];

  public especialistaElejido: any = null;
  public listadoUsuariosEspecialistas: Usuario[] = [];
  public listadoUsuariosEspecialistasCalificados: Usuario[] = [];

  public pacienteElejido: any = null;
  public listadoUsuariosPacientes: Usuario[] = [];

  public listadoTurnos: Turno[] = [];

  public listadoDias: Date[] = [];
  public listadoDeObjetosDias: any[] = [];

  constructor(private fb: FormBuilder, private AuthSvc: AuthService, private router: Router, private _Uservice: UsuariosService, private _Eservice: EspecialidadService, private _Mservice: MensajesService, private _Tservice: TurnosService) {
    this._Eservice.traerTodos().subscribe((especialidad: Especialidad[]) => {
      this.listadoEspecialidades = especialidad;
    });

    this._Uservice.obtenerEspecialistas().subscribe(data => {
      this.listadoUsuariosEspecialistas = data;
    });

    this._Uservice.obtenerPacientes().subscribe(data => {
      this.listadoUsuariosPacientes = data;
    });

    this._Tservice.traerTodos().subscribe((turnos: Turno[]) => {
      this.listadoTurnos = turnos;
    });

  }

  async ngOnInit() {

    var user = await this.AuthSvc.getCurrentUser();
    if (user?.email != null && user) {
      // console.log(user.email);
      var dataUser: any = await this._Uservice.getUsuarioPorEmail(user.email);
      // console.log(dataUser);
      this.usuarioRegistrado = dataUser;
    }
  }

  clickEspecialidad(data: any) {
    this.listadoUsuariosEspecialistasCalificados = [];
    this.especialidadElejida = data;

    this.filtrarListaEspecialistas();
  }

  filtrarListaEspecialistas() {
    this.listadoUsuariosEspecialistas.forEach(especilista => {
      especilista.especialidades?.forEach(especialidad => {
        // console.log(especialidad.nombre);
        if (especialidad.nombre == this.especialidadElejida.nombre) {
          this.listadoUsuariosEspecialistasCalificados.push(especilista);
        }
      });
    });
    //  console.log(this.listadoUsuariosEspecialistasCalificados);
  }

  clickEspecialista(data: any) {
    // console.log(data);
    this.especialistaElejido = data;
    if (this.usuarioRegistrado?.tipoPerfil == 'Paciente') {
      if (this.especialidadElejida != null && this.especialistaElejido != null) {
        this.cargarListaDeTurnos();
      }
    }
    if (this.usuarioRegistrado?.tipoPerfil == 'Admin') {
      console.log("ADMIN");
    }
  }
  clickPaciente(paciente: any) {
    this.pacienteElejido=paciente;
    this.cargarListaDeTurnos();
  }

  reservarTurno(horario: any, dia: any) {
    var auxTurno: Turno
    // console.log("H", horario);
    // console.log("d", dia);
    // console.log(this.usuarioRegistrado);
    if (this.usuarioRegistrado?.tipoPerfil == "Paciente") {
      auxTurno = {
        id : uuidv4(),
        paciente: this.usuarioRegistrado,
        profesional: this.especialistaElejido,
        estado: 'PENDIENTE',
        hora: horario,
        fecha: dia.diaExacto,
        especialidad: this.especialidadElejida,
        comentarioProfesional: '',
        comentarioPaciente: '',
        encuesta: {
          atencionRecibida: '',
          servicioOnline: '',
          estadoEstablecimiento: '',
          recomiendaClinida: ''
        }
      }
      console.log(auxTurno);
      this._Tservice.alta(auxTurno);
      this._Mservice.mensajeExitoso("Su turno fue cargado de manera exitosa!");
      this.router.navigate(['/home']);
    }

    if (this.usuarioRegistrado?.tipoPerfil == "Admin") {
      auxTurno = {
        id : uuidv4(),
        paciente: this.pacienteElejido,
        profesional: this.especialistaElejido,
        estado: 'PENDIENTE',
        hora: horario,
        fecha: dia.diaExacto,
        especialidad: this.especialidadElejida,
        comentarioProfesional: '',
        comentarioPaciente: '',
        encuesta: {
          atencionRecibida: '',
          servicioOnline: '',
          estadoEstablecimiento: '',
          recomiendaClinida: ''
        }
      }
      console.log(auxTurno);
      this._Tservice.alta(auxTurno);
      this._Mservice.mensajeExitoso("Le cargaste el turno a " + auxTurno.paciente?.nombre + " con exito! (ADMIN)");
      this.router.navigate(['/home']);
    }


  }
  cargarListaDeTurnos() {
    this.cargar15dias();
    this.filtradoDeDias();
    // console.log("entra");
  }

  filtradoDeDias() {
    if (this.especialistaElejido == undefined && this.listadoDias != []) {
      console.log("test1");
    } else {
      var aux;
      // console.log(this.especialistaElejido);
      // console.log(this.listadoDias);

      // console.log(this.listadoDias[0].getDate());// 27
      // console.log(this.listadoDias[0].getDay()); // 4 (raro)
      // console.log(this.listadoDias[0].getMonth()); // 4 (raro)
      // console.log(this.listadoDias[0].getFullYear()); // 2021
      // console.log(this.listadoDias[0].toDateString()); // Thu May 27 2021
      // console.log(this.listadoDias[0].toLocaleDateString());// 27/5/2021
      // console.log(this.especialistaElejido.diasDeAtencion[0]);
      this.listadoDias.forEach(dia => {
        var diaSemana = this.queDiaEs(dia);
        // console.log(diaSemana);
        var d = this.queDiaDeEspecialistaDevuelvo(diaSemana);

        aux = {
          dia: dia,
          diaExacto: dia.toLocaleDateString(),
          diaSemana: diaSemana,
          data: d,
          turnos: this.calculaTurnos(d),
        }
        this.listadoDeObjetosDias.push(aux);
      });
      console.log("inicial", this.listadoDeObjetosDias);

      this.listadoDeObjetosDias.forEach(dia => {
        if (dia.diaSemana == "DOMINGO" || dia.data == undefined) {
          this.listadoDeObjetosDias.splice(this.listadoDeObjetosDias.indexOf(dia), 1);
        }
      });
      this.listadoDeObjetosDias.forEach(dia => {
        if (dia.data.trabaja == false) {
          this.listadoDeObjetosDias.splice(this.listadoDeObjetosDias.indexOf(dia), 1);
        }
      });
      console.log("viejo", this.listadoDeObjetosDias);

      this.listadoTurnos.forEach(turno => {
        console.log(turno);
        if (turno.profesional?.uid == this.especialistaElejido.uid) {
          console.log("Son iguales");
          this.listadoDeObjetosDias.forEach(dia => {
            if (turno.fecha == dia.diaExacto) {
              dia.turnos.forEach((hturno: any) => {
                if (hturno == turno.hora) {
                  // console.log("aca x3");
                  dia.turnos.splice(dia.turnos.indexOf(hturno), 1);
                } else {
                  // console.log("aca x4");
                }
              });
              // console.log("aca x2");
            }
          });
        }
      });
      console.log("actual", this.listadoDeObjetosDias);

    }
  }

  calculaTurnos(data: any) {
    if (data != null) {
      var arrayTurnosPosibles = [];
      var auxMax = data.finaliza;
      var auxMin = data.inicia;

      // while(auxMax != data.inicia){
      while (auxMin != data.finaliza) {
        arrayTurnosPosibles.push(auxMin);
        auxMin = auxMin + 1;
      }
      // console.log("turnos posibles", arrayTurnosPosibles);
      return arrayTurnosPosibles;
    } else {
      return null;
    }
  }

  queDiaDeEspecialistaDevuelvo(diaSemana: string) {
    var retorno;
    this.especialistaElejido.diasDeAtencion.forEach((d: Dia) => {
      if (diaSemana == d.dia) {
        retorno = d;
      }
    });
    return retorno;
  }
  queDiaEs(dia: Date) {
    // console.log("--------");
    // console.log(dia.toDateString().split(' ')[0]);
    var retorno = "";
    switch (dia.toDateString().split(' ')[0]) {
      case 'Mon':
        retorno = "LUNES";
        break;
      case 'Tue':
        retorno = "MARTES";
        break;
      case 'Wed':
        retorno = "MIERCOLES";
        break;
      case 'Thu':
        retorno = "JUEVES";
        break;
      case 'Fri':
        retorno = "VIERNES";
        break;
      case 'Sat':
        retorno = "SABADO";
        break;
      case 'Sun':
        retorno = "DOMINGO";
        break;
    }
    return retorno;
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
    var fecha11 = new Date(Date.now());
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

    // console.log( this.listadoDias);
  }
}
