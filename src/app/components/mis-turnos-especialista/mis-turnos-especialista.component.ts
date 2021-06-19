import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/Models/Usuario';
import { Turno } from 'src/Models/Turno';
import { HistoriaClinica } from 'src/Models/HistoriaClinica';
import { v4 as uuidv4 } from 'uuid';
import { HistoriaClinicaService } from 'src/app/services/historiaClinica/historia-clinica.service';

@Component({
  selector: 'app-mis-turnos-especialista',
  templateUrl: './mis-turnos-especialista.component.html',
  styleUrls: ['./mis-turnos-especialista.component.scss']
})
export class MisTurnosEspecialistaComponent implements OnInit {

  public usuarioRegistrado: Usuario | null = null;

  public listadoTurnos: Turno[] = [];
  turnoActual: Turno | null = null;

  filterPasadoProf = "";
  mensaje: string = '';

  //Pantallas
  verTabla: boolean = true;
  cancelarTurnoPantalla: boolean = false;
  FinalizarTurnoPantalla: boolean = false;
  cargarHistoriaClinicaTurnoPantalla: boolean = false;

  histoClinica: HistoriaClinica | null = null;

  constructor(private AuthSvc: AuthService, private _Uservice: UsuariosService, private _Mservice: MensajesService, private _Tservice: TurnosService, private router: Router, private _HCservice: HistoriaClinicaService) { }

  async ngOnInit() {
    var user = await this.AuthSvc.getCurrentUser();
    if (user?.email != null && user) {
      var dataUser: any = await this._Uservice.getUsuarioPorEmail(user.email);
      this.usuarioRegistrado = dataUser;

      this._Tservice.obtenerTurnoProfesionalDe(this.usuarioRegistrado?.uid).subscribe(data => {
        this.listadoTurnos = data;
      });
    }
  }

  async aceptarTurno(turno: Turno) {
    var idTurno = await this._Tservice.obtenerKeyTurno(turno);
    console.log(turno);
    console.log(idTurno);
    turno!.estado = 'ACEPTADO';
    if (idTurno != null) {
      this._Tservice.updateTurnoEstadosYcomentarios(idTurno, turno, "Turno aceptado!", "El turno no pudo ser aceptado, por favor reintente!", false);
    }
    console.log("entro");
  }

  cancelarTurno(turno: Turno) {
    this.turnoActual = turno;
    this.verTabla = false;
    this.cancelarTurnoPantalla = true;
  }

  finalizarTurno(turno: Turno) {
    this.turnoActual = turno;
    this.verTabla = false;
    this.FinalizarTurnoPantalla = true;
  }
  resenaTurno(turno: Turno) {
    if (turno.comentarioProfesional) {
      this._Mservice.mensajeExitosoReserva(turno.comentarioProfesional);
    }
  }

  historiaClinica(turno: Turno) {
    this.turnoActual = turno;
    this.verTabla = false;
    this.cargarHistoriaClinicaTurnoPantalla = true;

  }



  async eventoHistoriaClinica($event: any) {
    var hc: HistoriaClinica;
    console.log("----------");
    // console.log($event);
    console.log(this.turnoActual);

    if ($event != null) {
      hc = {        
        idPaciente: this.turnoActual?.paciente?.uid,
        paciente: this.turnoActual?.paciente!,
        altura: $event.altura,
        peso: $event.peso,
        temperatura: $event.temperatura,
        presion: $event.presion,
        key1: $event.key1,
        key2: $event.key2,
        dato1: $event.dato1,
        dato2: $event.dato2,
        listadoTurnos: [],
      }

      this._HCservice.obtenerKeyIdPacienteHC(hc).then(r => {
        //Solo actualizo
        console.log("r " + r);
        this._Tservice.obtenerTurnoDe(hc.idPaciente).subscribe(data => {
          hc.listadoTurnos = data;
          console.log("UPDATE");
          console.log(hc);

          this._HCservice.updateHC(r, hc, "Historia clinica ACTUALIZADA", "No se pudo actualiza la Historia Clinica");          
        });
      }).catch(e => {
        //No existe entonces creo la HC
        console.log("e " + e);
        //busco todos los turnos de mi paciente
        this._Tservice.obtenerTurnoDe(hc.idPaciente).subscribe(data => {
          hc.listadoTurnos = data;
          hc.id= uuidv4(),
          console.log("Nuevo");
          console.log(hc);
          this._HCservice.alta(hc);
          this._Mservice.mensajeExitoso("Historia Clinica CREADA");
        });
      });

    }

    this.cargarHistoriaClinicaTurnoPantalla = false;
    this.verTabla = true;

    this.turnoActual = null;


    // if($event.opcion){
    //   console.log(this.turnoActual);
    //   this.turnoActual!.encuesta = $event;

    //   var idTurno = await this._Tservice.obtenerKeyTurno(this.turnoActual!);
    //   console.log(this.turnoActual);
    //   console.log(idTurno);
    //   if (idTurno != null) {
    //     this._Tservice.updateTurno(idTurno, this.turnoActual!, "Encuesta completa", "La encuesta no pudo ser completada");
    //   }
    // }

    // this.encuestaTurnoPantalla = false;
    // this.verTabla = true;

    // this.turnoActual = null;
  }

  eventoFinalizarTurno($event: any) {
    setTimeout(async () => {
      console.log($event);
      console.log(this.mensaje);
      if ($event) {

        this.turnoActual!.comentarioProfesional = this.mensaje;
        this.turnoActual!.estado = 'FINALIZADO';

        var idTurno = await this._Tservice.obtenerKeyTurno(this.turnoActual!);
        console.log(this.turnoActual);
        console.log(idTurno);
        if (idTurno != null) {
          this._Tservice.updateTurnoEstadosYcomentarios(idTurno, this.turnoActual!, "Turno Finalizado", "El turno no pudo ser finalizado, por favor reintente!", true);
        }
      }
      this.FinalizarTurnoPantalla = false;
      this.verTabla = true;

      this.turnoActual = null;
      this.mensaje = '';
    }, 100);
  }

  eventoCancelarTurno(event$: any) {
    setTimeout(async () => {
      console.log(event$);
      console.log(this.mensaje);
      if (event$) {

        this.turnoActual!.comentarioProfesional = this.mensaje;
        this.turnoActual!.estado = 'CANCELADO';

        var idTurno = await this._Tservice.obtenerKeyTurno(this.turnoActual!);
        console.log(this.turnoActual);
        console.log(idTurno);
        if (idTurno != null) {
          this._Tservice.updateTurnoEstadosYcomentarios(idTurno, this.turnoActual!, "Turno cancelado", "El turno no pudo ser cancelado, por favor reintente!", true);
        }
      }
      this.cancelarTurnoPantalla = false;
      this.verTabla = true;

      this.turnoActual = null;
      this.mensaje = '';
    }, 100);
  }

  eventoMensaje(event$: any) {
    this.mensaje = event$;
  }


}
