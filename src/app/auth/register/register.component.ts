import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Especialidad } from 'src/Models/Especialidad';
import { Usuario } from 'src/Models/Usuario';
import { AuthService } from '../service/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Dia } from 'src/Models/Dia';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {

  public tipoPerfil: string | null = "";
  public listadoEspecialidades!: Especialidad[];
  public registerForm: FormGroup | undefined;

  public nombreEspecialidad: string = "";
  public duracionEspecialidad: string = "";
  public errorEspecialidad: string = "";
  public banderaEspecialidadSeleccionada = true;
  public listaEspecialidadesSeleccionadas: Array<Especialidad> = new Array<Especialidad>();
  public listaDiasSeleccionadas: Array<Dia> = new Array<Dia>();

  private foto1: any | null = null;
  private foto2: any | null = null;
  public urlImage: string | any = "";
  // public errorSinSeleccion: string = "";

  // public perfil: string = "Paciente"; //"Especialista"; // "Paciente";


  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private AuthSvc: AuthService, private router: Router, private route: ActivatedRoute, private _Uservice: UsuariosService, private _Eservice: EspecialidadService, private _Mservice: MensajesService) {
  }

  ngOnInit(): void {

    this.tipoPerfil = this.route.snapshot.paramMap.get('tipoPerfil');
    if (this.tipoPerfil == null) {
      this.tipoPerfil = "Paciente";
    }

    if (this.tipoPerfil == "Paciente") {
      this.registerForm = this.fb.group({
        'nombre': ['', [Validators.required]],//Obli
        'apellido': ['', [Validators.required]],//Obli
        'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],//Obli
        'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],//Obli
        'foto1': ['', [Validators.required]],//Obli
        'email': ['', [Validators.required]],//Obli
        'contraseña': ['', [Validators.required, Validators.minLength(6)]],//Obli

        'foto2': ['', [Validators.required]],//Solo Paciente
        'obraSocial': ['', [Validators.required]],//Solo Paciente  
      });
    } else {
      this.registerForm = this.fb.group({
        'nombre': ['', [Validators.required]],//Obli
        'apellido': ['', [Validators.required]],//Obli
        'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],//Obli
        'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],//Obli
        'foto1': ['', [Validators.required]],//Obli
        'email': ['', [Validators.required]],//Obli
        'contraseña': ['', [Validators.required, Validators.minLength(6)]],//Obli

        'especialidad': ['', [Validators.required]],//Solo Especialista
        //public especialidad: string = ''; 

      });
    }

    this._Eservice.traerTodos().subscribe((especialidad: Especialidad[]) => {
      this.listadoEspecialidades = especialidad;
    });

    this.agregarDias();
  }


  nuevaImagen(event: any, cual: string): void {
    if (cual == 'foto1') {
      this.foto1 = event.target.files[0];
    } else {
      this.foto2 = event.target.files[0];
    }
  }

  veoForm() {
    console.log(this.registerForm);
    console.log(this.listaEspecialidadesSeleccionadas);
    console.log(this.listaDiasSeleccionadas);
  }

  validaCaptcha(){
    // var response =  grecaptcha.getResponse();
    // if(response.length != 0){

    // }
  }

  agregarNuevaEspecialidad() {
    console.log(this.nombreEspecialidad);
    console.log(this.duracionEspecialidad);
    if (this.nombreEspecialidad != '' && this.duracionEspecialidad != '') {
      this.errorEspecialidad = this.nombreEspecialidad + "&" + this.duracionEspecialidad;
      let especialidad: Especialidad = {
        nombre: this.nombreEspecialidad,
        duracion: parseFloat(this.duracionEspecialidad),
        imagen: 'https://firebasestorage.googleapis.com/v0/b/clinicaonline-cfa90.appspot.com/o/especialidades%2Fgenerica.png?alt=media&token=708d9d2f-c51b-4310-8e56-8d814e2b240b',
      };
      this._Eservice.altaEspecialidad(especialidad);
    } else {
      this.errorEspecialidad = 'Por favor cargue el nombre y la duración de la especialidad';
    }
  }

  agregarEspecialidad(especialidad: Especialidad) {
    this.banderaEspecialidadSeleccionada = false;
    if (this.listaEspecialidadesSeleccionadas.includes(especialidad)) {
    }
    else {
      this.listaEspecialidadesSeleccionadas.push(especialidad);
      this.registerForm?.controls['especialidad'].setValue(this.listaEspecialidadesSeleccionadas);
    }
  }

  agregarDias() {

    this.listaDiasSeleccionadas.push(new Dia(true, 'LUNES', 8, 19));
    this.listaDiasSeleccionadas.push(new Dia(true, 'MARTES', 8, 19));
    this.listaDiasSeleccionadas.push(new Dia(true, 'MIERCOLES', 8, 19));
    this.listaDiasSeleccionadas.push(new Dia(true, 'JUEVES', 8, 19));
    this.listaDiasSeleccionadas.push(new Dia(true, 'VIERNES', 8, 19));
    this.listaDiasSeleccionadas.push(new Dia(true, 'SABADO', 8, 14));
  }

  eliminarEspecialidad(especialidad: Especialidad) {
    this.listaEspecialidadesSeleccionadas.splice(this.listaEspecialidadesSeleccionadas.indexOf(especialidad), 1);
    this.registerForm?.controls['especialidad'].setValue(this.listaEspecialidadesSeleccionadas);
    if (this.listaEspecialidadesSeleccionadas.length == 0) {
      this.banderaEspecialidadSeleccionada = true;
    }
  }

  CargaDatos() {
    this.registerForm?.controls['nombre'].setValue('pepe');
    this.registerForm?.controls['apellido'].setValue('pepe');
    this.registerForm?.controls['edad'].setValue(22);
    this.registerForm?.controls['dni'].setValue(12345678);
    this.registerForm?.controls['email'].setValue('matias.palmieri.01@gmail.com');
    this.registerForm?.controls['contraseña'].setValue('matias1');
  }


  async SubirFoto(uid: string) {
    var filePath: any;
    if (this.foto1 != null) {
      filePath = `${uid}/${this.foto1.name}`;
      this.storage.ref(filePath);
      this.storage.upload(filePath, this.foto1);
    }

    if (this.foto2 != null) {
      filePath = `${uid}/${this.foto2.name}`;
      this.storage.ref(filePath);
      this.storage.upload(filePath, this.foto2);
    }
  }

  async onRegister() {
    const { email, contraseña } = this.registerForm?.value;
    console.log(email, contraseña);
    try {
      if (this.tipoPerfil == "Paciente") {
        this.AuthSvc.register(email, contraseña).then((r) => {
          console.log(r?.user?.uid);

          let user: Usuario = {
            nombre: this.registerForm?.controls['nombre'].value,
            apellido: this.registerForm?.controls['apellido'].value,
            edad: this.registerForm?.controls['edad'].value,
            dni: this.registerForm?.controls['dni'].value,
            foto1: this.registerForm?.controls['foto1'].value,
            tipoPerfil: this.tipoPerfil,
            email: this.registerForm?.controls['email'].value,
            contraseña: this.registerForm?.controls['contraseña'].value,
            uid: r?.user?.uid,
            obraSocial: this.registerForm?.controls['obraSocial'].value,
            foto2: this.registerForm?.controls['foto2'].value,
            aprovadoPorAdmin: true,
          };
          console.log(user);
          console.log(this.foto1);
          this._Uservice.subirUsuarioCon2Imagenes(this.foto1, this.foto2, user);


          // this._Uservice.altaUsuario(user);
          // this.SubirFoto(user.uid);

          this._Mservice.mensajeExitoso("Paciente dado de alta");
          this.foto1 = null;
          this.foto2 = null;
          //redirect login +agregar parametro
          this.router.navigate(['/verificacion', user.email]);

        });
      }
      if (this.tipoPerfil == "Especialista") {
        this.AuthSvc.register(email, contraseña).then((r) => {
          console.log(r?.user?.uid);
          console.log("ADENTRO1");
          let user: Usuario = {
            nombre: this.registerForm?.controls['nombre'].value,
            apellido: this.registerForm?.controls['apellido'].value,
            edad: this.registerForm?.controls['edad'].value,
            dni: this.registerForm?.controls['dni'].value,
            foto1: this.registerForm?.controls['foto1'].value,
            tipoPerfil: this.tipoPerfil,
            email: this.registerForm?.controls['email'].value,
            contraseña: this.registerForm?.controls['contraseña'].value,
            uid: r?.user?.uid,
            aprovadoPorAdmin: false,
            especialidades: this.listaEspecialidadesSeleccionadas,
            diasDeAtencion: this.listaDiasSeleccionadas,
          };
          console.log(user);
          // console.log("ADENTRO4");
          // this._Uservice.altaUsuario(user);
          // this.SubirFoto(user.uid);
          // console.log("ADENTRO3");
          // this._Mservice.mensajeExitoso("Especialista dado de alta");
          // this.router.navigate(['/verificacion', user.email]);

          this._Uservice.subirUsuarioCon1Imagenes(this.foto1, user);
          this._Mservice.mensajeExitoso("Especialista dado de alta");
          this.foto1 = null;
          this.foto2 = null;
          this.router.navigate(['/verificacion', user.email]);

        });
      }

    } catch (error) {
      console.log(error);
    }
  }
}
  /*

async onRegister() {
// console.log(this.registerForm);
// console.log(this.registerForm.value);
// console.log(this.foto1);
// console.log(this.foto2);

const { email, contraseña } = this.registerForm.value;
try {
console.log(this.perfil);
if (this.perfil == "Paciente") {
this.AuthSvc.register(email, contraseña).then((r) => {
// console.log(r);
console.log(r?.user?.uid);
// console.log(r?.operationType);

let user: Usuario = {
nombre: this.registerForm.controls['nombre'].value,
apellido: this.registerForm.controls['apellido'].value,
edad: this.registerForm.controls['edad'].value,
dni: this.registerForm.controls['dni'].value,
foto1: this.registerForm.controls['foto1'].value,
tipoPerfil: this.tipoPerfil,
email: this.registerForm.controls['email'].value,
contraseña: this.registerForm.controls['contraseña'].value,
uid: r?.user?.uid,
obraSocial: this.registerForm.controls['obraSocial'].value,
foto2: this.registerForm.controls['foto2'].value,
};
console.log(user);

this._Uservice.subirUsuarioCon2Imagenes(this.foto1, this.foto2, user);

this._Mservice.mensajeExitoso("Paciente dado de alta");

//redirect login
this.router.navigate(['/verificacion']);
});
}
if (this.perfil == "Especialista" && this.listaEspecialidadesSeleccionadas.length >= 1) {
this.AuthSvc.register(email, contraseña).then((r) => {
console.log(r);
console.log(r?.user?.uid);
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
aprovadoPorAdmin: false,
};

this._Uservice.subirUsuarioCon1Imagenes(this.foto1, user);
this._Mservice.mensajeExitoso("Especialista dado de alta");
this.router.navigate(['/verificacion']);

});
}
if (this.perfil == "Especialista" && this.listaEspecialidadesSeleccionadas.length == 0) {
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






}
*/