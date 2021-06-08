import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/Models/Usuario';
import { Turno } from 'src/Models/Turno';

@Component({
  selector: 'app-mis-turnos-especialista',
  templateUrl: './mis-turnos-especialista.component.html',
  styleUrls: ['./mis-turnos-especialista.component.scss']
})
export class MisTurnosEspecialistaComponent implements OnInit {

  public usuarioRegistrado: Usuario | null = null;

  public listadoTurnos: Turno[] = [];
  turnoActual: Turno | null = null;

  mensaje: string = '';

  //Pantallas
  verTabla: boolean = true;
  cancelarTurnoPantalla: boolean = false;

  constructor(private AuthSvc: AuthService, private _Uservice: UsuariosService, private _Mservice: MensajesService, private _Tservice: TurnosService, private router: Router,) { }

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

        this.turnoActual!.comentarioProfesional = this.mensaje;
        this.turnoActual!.estado = 'CANCELADO';

        var idTurno = await this._Tservice.obtenerKeyTurno(this.turnoActual!);
        console.log(this.turnoActual);
        console.log(idTurno);
        if (idTurno != null) {
          this._Tservice.updateTurnoCancelar(idTurno, this.turnoActual!);
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
