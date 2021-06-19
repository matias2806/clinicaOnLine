import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from 'src/Models/Usuario';
import { AuthService } from '../../auth/service/auth.service';
import { map, finalize } from 'rxjs/operators';
import { Dia } from 'src/Models/Dia';
import { HistoriaClinicaService } from 'src/app/services/historiaClinica/historia-clinica.service';
import { HistoriaClinica } from 'src/Models/HistoriaClinica';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  public usuario: Usuario | null = null;
  public iniciaJornada: any;
  public hc :HistoriaClinica | null=null;
  public historiasClinicas: HistoriaClinica[] =[];

  constructor(public authSvc: AuthService, private _Uservice: UsuariosService,private _HCservice: HistoriaClinicaService,) { }

  // dias:Dia[]=[];
  listaHorarios: string[] = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  listaHorariossalida: string[] = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  async ngOnInit() {
    var user = await this.authSvc.getCurrentUser();
    if (user?.email != null && user) {
      // console.log(user.email);
      var dataUser: any = await this._Uservice.getUsuarioPorEmail(user.email);
      console.log(dataUser);
      this.usuario = dataUser;
      await this.buscarHC();
      console.log(this.hc);
    }
  }

  async buscarHC(){
    console.log("gg=>"+ this.usuario?.uid);
    this._HCservice.traerTodos().subscribe((historiasClinicas: HistoriaClinica[]) => {
      this.historiasClinicas = historiasClinicas;
      this.filtrarHCS();
    });
  }

  filtrarHCS(){
    this.historiasClinicas.forEach(hc => {
      if(hc.idPaciente == this.usuario?.uid){
        console.log("MATHCHHHH");
        this.hc = hc;
        console.log(this.hc);
      }
    });
  }

  actualizacion() {
    console.log("pepe");
  }

  async guardar() {
    console.log(this.usuario);
    if (this.usuario != null) {
      var idUser = await this._Uservice.obtenerKeyUsuario(this.usuario);
      if (idUser != null) {
        this._Uservice.updateDiasEspecialistas(idUser, this.usuario);
      }
    }
  }

}
