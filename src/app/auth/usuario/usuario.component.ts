import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from 'src/Models/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  public registerForm: FormGroup;
  private foto1: any;
  private foto2: any;
  public perfil: string = "Paciente"; //"Especialista"; // "Paciente";

  public listadoUsuarios!: Usuario[];

  constructor(private fb: FormBuilder, private AuthSvc: AuthService, private router: Router, private _Uservice: UsuariosService, private _Eservice: EspecialidadService, private _Mservice: MensajesService) {

    this._Uservice.traerTodos().subscribe((usuarios: Usuario[]) => {
      // console.log(especialidad);
      this.listadoUsuarios = usuarios;
    });

    this.registerForm = this.fb.group({
      'nombre': ['', [Validators.required]],//Obli
      'apellido': ['', [Validators.required]],//Obli
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],//Obli
      'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],//Obli
      'email': ['', [Validators.required]],//Obli
      'contraseña': ['', [Validators.required, Validators.minLength(6)]],//Obli
      'foto1': ['', [Validators.required]],//Obli
      'tipoPerfil': ['', [Validators.required]],//Obli
    });
    this.registerForm.controls['tipoPerfil'].setValue('Paciente');
   }

  ngOnInit(): void {
  }

  onRegister() {

  }

  nuevaImagen(event: any, cual: string): void {
    if (cual == 'foto1') {
      this.foto1 = event.target.files[0];
    } else {
      this.foto2 = event.target.files[0];
    }
  }


  rechazarUsuario(usuario: Usuario)
  {

  }

  aprobarUsuario(usuario: Usuario){
    console.log(usuario);
  }


  CargaDatos() {

    this.registerForm.controls['nombre'].setValue('admin');
    this.registerForm.controls['apellido'].setValue('admin');
    this.registerForm.controls['edad'].setValue(22);
    this.registerForm.controls['dni'].setValue(12345678);
    this.registerForm.controls['email'].setValue('matias.palmieri.01@gmail.com');
    this.registerForm.controls['contraseña'].setValue('matias1');
  }

}
