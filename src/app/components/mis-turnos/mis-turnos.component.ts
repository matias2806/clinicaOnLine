import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/Models/Usuario';
import { Turno } from 'src/Models/Turno';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  public usuarioRegistrado: Usuario | null = null;

  public listadoTurnos: Turno[] = [];
  turnoActual: Turno | null = null;


  mensaje: string = '';

  //Pantallas
  // verTabla: boolean = true;
  // cancelarTurnoPantalla: boolean = false;
  // encuestaTurnoPantalla: boolean = false;

  verTabla: boolean = false;
  cancelarTurnoPantalla: boolean = false;
  encuestaTurnoPantalla: boolean = true;

  constructor(private AuthSvc: AuthService, private _Uservice: UsuariosService, private _Mservice: MensajesService, private _Tservice: TurnosService, private router: Router,) {
    // this._Tservice.traerTodos().subscribe((turnos: Turno[]) => {
    //   this.listadoTurnos = turnos;
    //   console.log(this.listadoTurnos);
    // });


  }

  async ngOnInit() {
    var user = await this.AuthSvc.getCurrentUser();
    if (user?.email != null && user) {
      var dataUser: any = await this._Uservice.getUsuarioPorEmail(user.email);
      this.usuarioRegistrado = dataUser;

      this._Tservice.obtenerTurnoDe(this.usuarioRegistrado?.uid).subscribe(data => {
        this.listadoTurnos = data;
      });
    }
  }

  resenaTurno(turno: Turno) {
    if (turno.comentarioProfesional) {
      this._Mservice.mensajeExitosoReserva(turno.comentarioProfesional);
    }
  }

  completarEncuesta(turno: Turno) {
    this.turnoActual = turno;
    this.verTabla = false;
    this.encuestaTurnoPantalla = true;
  }

  cancelarTurno(turno: Turno) {
    this.turnoActual = turno;
    this.verTabla = false;
    this.cancelarTurnoPantalla = true;
  }


  eventoCancelarTurno(event$: any) {
    setTimeout(async () => {
      console.log(event$);
      console.log(this.mensaje);
      if (event$) {

        this.turnoActual!.comentarioPaciente = this.mensaje;
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
