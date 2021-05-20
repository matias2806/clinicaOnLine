import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from 'src/Models/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-email-enviado',
  templateUrl: './email-enviado.component.html',
  styleUrls: ['./email-enviado.component.scss'],
  providers:[AuthService],
})
export class EmailEnviadoComponent implements OnInit {

  public user$: Observable<any> = this.AuthSvc.afAuth.user;
  public email:string="";
  public userActual: Usuario | null =null;

  constructor(private AuthSvc: AuthService, private _Uservice : UsuariosService) { 
    console.log(this.user$.subscribe((r)=>{
      console.log(r);
    }));
    
    this._Uservice.traerTodos().subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      console.log(this.userActual);
      
      usuarios.forEach(usuario => {
        if (usuario.uid == this.AuthSvc.usuario.uid) {
          this.userActual = usuario;
        }
      });
      console.log("EL ACTUAL", this.userActual);
    });

    setTimeout(() => {
      this.AuthSvc.logout();
    }, 2000);
  }

  ngOnInit(): void {
  }

  reenviarEmail(){
    this.AuthSvc.sendVerificationEmail();
  }

}
