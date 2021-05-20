import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Especialidad } from 'src/Models/Especialidad';
import { Usuario } from 'src/Models/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {

  public listadoEspecialidades!: Especialidad[];
  public nombreEspecialidad: string = "";
  public duracionEspecialidad: string = "";
  public errorEspecialidad: string = "";
  // public errorSinSeleccion: string = "";

  

  public registerForm: FormGroup;
  private foto1: any;
  private foto2: any;
  public perfil: string = "Paciente"; //"Especialista"; // "Paciente";

  listaEspecialidadesSeleccionadas: Array<Especialidad> = new Array<Especialidad>();
  public banderaEspecialidadSeleccionada = true;

  constructor(private fb: FormBuilder, private AuthSvc: AuthService, private router: Router, private _Uservice: UsuariosService, private _Eservice: EspecialidadService, private _Mservice: MensajesService) {

    this._Eservice.traerTodos().subscribe((especialidad: Especialidad[]) => {
      console.log(especialidad);
      this.listadoEspecialidades = especialidad;
    });

    this.registerForm = this.fb.group({
      'nombre': ['', [Validators.required]],//Obli
      'apellido': ['', [Validators.required]],//Obli
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],//Obli
      'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],//Obli
      'foto1': ['', [Validators.required]],//Obli
      'tipoPerfil': ['', [Validators.required]],//Obli
      'email': ['', [Validators.required]],//Obli
      'contraseña': ['', [Validators.required, Validators.minLength(6)]],//Obli

      'foto2': ['', [Validators.required]],//Solo Paciente
      'obraSocial': ['', [Validators.required]],//Solo Paciente

      //public especialidad: string = ''; //Solo Especialista

    });
    this.registerForm.controls['tipoPerfil'].setValue('Paciente');
  }

  ngOnInit(): void { }

  nuevaImagen(event: any, cual: string): void {
    if (cual == 'foto1') {
      this.foto1 = event.target.files[0];
    } else {
      this.foto2 = event.target.files[0];
    }
  }

  async onRegister() {
    // console.log(this.registerForm);
    // console.log(this.registerForm.value);
    // console.log(this.foto1);
    // console.log(this.foto2);

    const { email, contraseña } = this.registerForm.value;
    try {
      if (this.perfil == "Paciente") {
        this.AuthSvc.register(email, contraseña).then((r) => {
          // console.log(r);
          // console.log(r?.user?.uid);
          // console.log(r?.operationType);

          let user: Usuario = {
            nombre: this.registerForm.controls['nombre'].value,
            apellido: this.registerForm.controls['apellido'].value,
            edad: this.registerForm.controls['edad'].value,
            dni: this.registerForm.controls['dni'].value,
            foto1: this.registerForm.controls['foto1'].value,
            tipoPerfil: this.registerForm.controls['tipoPerfil'].value,
            email: this.registerForm.controls['email'].value,
            contraseña: this.registerForm.controls['contraseña'].value,
            uid: r?.user?.uid,
            obraSocial: this.registerForm.controls['obraSocial'].value,
            foto2: this.registerForm.controls['foto2'].value,
          };


          this._Uservice.subirUsuarioCon2Imagenes(this.foto1, this.foto2, user);
          
          this._Mservice.mensajeExitoso("Paciente dado de alta");

          //redirect login
          this.router.navigate(['/verificacion']);
        });
      }
      if (this.perfil == "Especialista" && this.listaEspecialidadesSeleccionadas.length >= 1) {
        this.AuthSvc.register(email, contraseña).then((r) => {
          // console.log(r);
          // console.log(r?.user?.uid);
          // console.log(r?.operationType);

          let user: Usuario = {
            nombre: this.registerForm.controls['nombre'].value,
            apellido: this.registerForm.controls['apellido'].value,
            edad: this.registerForm.controls['edad'].value,
            dni: this.registerForm.controls['dni'].value,
            especialidades: this.listaEspecialidadesSeleccionadas,
            foto1: this.registerForm.controls['foto1'].value,
            tipoPerfil: this.registerForm.controls['tipoPerfil'].value,
            email: this.registerForm.controls['email'].value,
            contraseña: this.registerForm.controls['contraseña'].value,
            uid: r?.user?.uid,

          };

          this._Uservice.subirUsuarioCon1Imagenes(this.foto1, user);
          this._Mservice.mensajeExitoso("Especialista dado de alta");
          this.router.navigate(['/verificacion']);
          
        });
      }
      else{
        // this.errorSinSeleccion = 'Seleccione 1 especialidad como minimo';
        console.log('Seleccione 1 especialidad como minimo');
        this._Mservice.mensajeError("Seleccione 1 especialidad como minimo");
      }
      if (this.perfil != "Especialista" && this.perfil != "Paciente") {
        console.log("OCURRIO UN ERROR GRABE");
      }


    } catch (error) {
      console.log(error);
    }
  }

  agregarNuevaEspecialidad() {
    console.log(this.nombreEspecialidad);
    console.log(this.duracionEspecialidad);
    if (this.nombreEspecialidad != '' && this.duracionEspecialidad != '') {
      this.errorEspecialidad = this.nombreEspecialidad + "&" + this.duracionEspecialidad;

      let especialidad: Especialidad = {
        nombre: this.nombreEspecialidad,
        duracion: parseFloat(this.duracionEspecialidad),
      };

      this._Eservice.altaEspecialidad(especialidad);


    } else {
      this.errorEspecialidad = 'Por favor cargue el nombre y la duración de la especialidad';
    }
  }

  agregarEspecialidad(especialidad: Especialidad) {
    this.banderaEspecialidadSeleccionada = false;
    if (this.listaEspecialidadesSeleccionadas.includes(especialidad)) {
      //console.log("Actor ya incluido");
    }
    else {
      this.listaEspecialidadesSeleccionadas.push(especialidad);
      // console.log(this.listaActoresSeleccionados);
    }
  }

  eliminarEspecialidad(especialidad: Especialidad) {
    this.listaEspecialidadesSeleccionadas.splice(this.listaEspecialidadesSeleccionadas.indexOf(especialidad), 1);
    // this.peliculaFuturaAlta.actores = this.listaEspecialidadesSeleccionadas;
    if (this.listaEspecialidadesSeleccionadas.length == 0) {
      this.banderaEspecialidadSeleccionada = true;
    }
  }

  CambiaPerfil() {
    setTimeout(() => {
      console.log(this.registerForm.controls['tipoPerfil'].value);
      this.perfil = this.registerForm.controls['tipoPerfil'].value;
    }, 300);
  }

  CargaDatos() {

    this.registerForm.controls['nombre'].setValue('pepe');
    this.registerForm.controls['apellido'].setValue('pepe');
    this.registerForm.controls['edad'].setValue(22);
    this.registerForm.controls['dni'].setValue(12345678);
    this.registerForm.controls['email'].setValue('matias.palmieri.01@gmail.com');
    this.registerForm.controls['contraseña'].setValue('matias1');
    this.registerForm.controls['obraSocial'].setValue('OSDE');
  }
}
