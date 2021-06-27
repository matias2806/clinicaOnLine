import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { HistoriaClinicaService } from 'src/app/services/historiaClinica/historia-clinica.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { HistoriaClinica } from 'src/Models/HistoriaClinica';
import { Turno } from 'src/Models/Turno';
import { Usuario } from 'src/Models/Usuario';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  public usuarioRegistrado: Usuario | null = null;
  public listadoTurnos: Turno[] = [];
  public listadoHC: HistoriaClinica[] = [];

  public cantidadTurnos = 0;
  public cantidadTurnosAceptados = 0;
  public cantidadTurnosFinalizados = 0;
  constructor(private AuthSvc: AuthService, private _Uservice: UsuariosService, private _Tservice: TurnosService, private _HCservice: HistoriaClinicaService) { }

  async ngOnInit() {
    var user = await this.AuthSvc.getCurrentUser();
    if (user?.email != null && user) {
      var dataUser: any = await this._Uservice.getUsuarioPorEmail(user.email);
      this.usuarioRegistrado = dataUser;
    }

    this._Tservice.traerTodos().subscribe((turnos: Turno[]) => {
      this.listadoTurnos = turnos;
      this.filtraTurno();
    });
  }

  filtraTurno() {
    var aux: string[] = [];
    this.listadoTurnos.forEach(turno => {
      if (turno.profesional?.uid == this.usuarioRegistrado?.uid) {
        this.cantidadTurnos++;
        if (turno.estado == "ACEPTADO") {
          this.cantidadTurnosAceptados++;
        }
        if (turno.estado == "FINALIZADO") {
          this.cantidadTurnosFinalizados++;
        }
        if (turno.estado == "ACEPTADO" || turno.estado == "FINALIZADO") {
          if(aux.indexOf(turno.paciente?.uid)){
            aux.push(turno.paciente?.uid);
          }
        }
      }
    });
    // console.log(aux);
    this.traerListaDeHC(aux);
  }

  traerListaDeHC(aux: string[]){
    if(aux != null){
      aux.forEach(el => {
        this._HCservice.obtenerHCDe(el).subscribe(data => {
          this.listadoHC.push(data[0]);
          // console.log(this.listadoHC);
        });
      });
    }
    


  }
}
