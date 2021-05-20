import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from 'src/Models/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  constructor(private AuthSvc: AuthService, private router: Router, private _Uservice: UsuariosService, private _Mservice: MensajesService) { }

  ngOnInit(): void {
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    //console.log('form ->',this.loginForm.value);
    try {
      const user = await this.AuthSvc.login(email, password);
      if (user && user.user?.emailVerified) {
        //Redirect to home page
        console.log("imprimo", user);
        console.log("UID", user.user.uid);
        console.log(this.AuthSvc.usuario);

        let userActual: Usuario;
        this._Uservice.traerTodos().subscribe((usuarios: Usuario[]) => {
          console.log(usuarios);
          usuarios.forEach(usuario => {
            if (usuario.uid == this.AuthSvc.usuario.uid) {
              userActual = usuario;
            }
          });
          console.log("EL ACTUAL", userActual);
          if (userActual.tipoPerfil == "Especialista" && userActual.aprovadoPorAdmin == true) {
            this.router.navigate(['/']);
          }
          if (userActual.tipoPerfil == "Especialista" && userActual.aprovadoPorAdmin == false) {
            this._Mservice.mensajeError("Su cuenta todavia no fue aprovada por un administrador, Tenga paciencia");
            this.router.navigate(['/']);
            this.AuthSvc.logout();
          }
        });
        
      } else if (user) {
        this.router.navigate(['/verificacion']);
      }
      else {
        this.router.navigate(['/register']);
      }
    } catch (error) {
      console.log("aa", error);
    }
  }

  cargarAdmin() {
    this.loginForm.setValue({ email: 'admin@gmail.com', password: 'admin01' });
  }

  cargarMatias() {
    this.loginForm.setValue({ email: 'matias.palmieri.01@gmail.com', password: 'matias1' });
  }

}
