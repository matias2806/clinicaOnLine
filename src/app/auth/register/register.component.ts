import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  private foto1: any;
  private foto2: any;
  public perfil: string = "Paciente"

  constructor(private fb: FormBuilder, private AuthSvc: AuthService, private router: Router) {

    this.registerForm = this.fb.group({
      'nombre': ['', [Validators.required]],
      'apellido': ['', [Validators.required]],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
      // 'foto1': ['', [Validators.required]],
      // 'foto2': ['', [Validators.required]],
      'tipoPerfil': ['', [Validators.required]],
      'obraSocial': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'contraseña': ['', [Validators.required, Validators.minLength(6)]],

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
    console.log(this.registerForm.value);
    // console.log(this.foto1);
    // console.log(this.foto2);

    // const { email, contraseña } = this.registerForm.value;
    // // console.log('form ->', this.registerForm.value);
    // try {
    //   this.AuthSvc.register(email, contraseña).then((r)=>{
    //     console.log(r);
    //     console.log(r?.user?.uid);
    //     console.log(r?.operationType);

    //     //redirect login
    //     //this.router.navigate(['/']);
    //   });

    // } catch (error) {
    //   console.log(error);
    // }
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
