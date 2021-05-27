import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from 'src/Models/Usuario';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  public registerForm: FormGroup | undefined;
  private foto1: any;
  public primeraVez: boolean = true;

  // public listadoUsuarios!: Usuario[];
  public listadoUsuariosEspecialistas: Usuario[] = [];

  constructor(private fb: FormBuilder, private AuthSvc: AuthService, private router: Router, private _Uservice: UsuariosService, private _Eservice: EspecialidadService, private _Mservice: MensajesService) { }

  ngOnInit(): void {
    
    this.registerForm = this.fb.group({
      'nombre': ['', [Validators.required]],//Obli
      'apellido': ['', [Validators.required]],//Obli
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],//Obli
      'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],//Obli
      'email': ['', [Validators.required]],//Obli
      'contraseña': ['', [Validators.required, Validators.minLength(6)]],//Obli
      'foto1': ['', [Validators.required]],//Obli
    });
  }

  onRegister() {
    // const { email, contraseña } = this.registerForm?.value;
    // // console.log("Entro al registro de admin");
    // this.AuthSvc.register(email, contraseña).then((r) => {
    //   // console.log(r?.user?.uid);

    //   let user: Usuario = {
    //     nombre: this.registerForm?.controls['nombre'].value,
    //     apellido: this.registerForm?.controls['apellido'].value,
    //     edad: this.registerForm?.controls['edad'].value,
    //     dni: this.registerForm?.controls['dni'].value,
    //     foto1: this.registerForm?.controls['foto1'].value,
    //     tipoPerfil: 'Admin',
    //     email: this.registerForm?.controls['email'].value,
    //     contraseña: this.registerForm?.controls['contraseña'].value,
    //     uid: r?.user?.uid,
    //     aprovadoPorAdmin: true,
    //   };
    //   // console.log(user);
    //   // console.log(this.foto1);
    //   this._Uservice.subirUsuarioCon1Imagenes(this.foto1, user);
    //   this._Mservice.mensajeExitoso("Admin dado de alta");
    //   this.foto1 = null;
    //   //redirect login +agregar parametro
    //   this.router.navigate(['/verificacion', user.email]);

    // });
  }

}
