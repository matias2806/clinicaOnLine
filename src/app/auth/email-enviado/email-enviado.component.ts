import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from 'src/Models/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-email-enviado',
  templateUrl: './email-enviado.component.html',
  styleUrls: ['./email-enviado.component.scss'],
  providers: [AuthService],
})
export class EmailEnviadoComponent implements OnInit {

  // public user$: Observable<any> = this.AuthSvc.afAuth.user;
  // public email: string = "";
  // public userActual: Usuario | null = null;
  public emailSujetoRegistrado: string | null = "";

  constructor(private AuthSvc: AuthService, private _Uservice: UsuariosService, private route: ActivatedRoute,) {
    this.AuthSvc.logout();
  }

  ngOnInit(): void {
    this.emailSujetoRegistrado = this.route.snapshot.paramMap.get('email');
  }

  reenviarEmail() {
    //esto no anda tendria que con el mail traerme el user loguearlo mandarle el mail y desloguearlo
    this.AuthSvc.sendVerificationEmail();
  }

}
