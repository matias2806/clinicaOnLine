import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HistoriaClinica } from 'src/Models/HistoriaClinica';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {

  // public registerForm!: FormGroup;

  altura: string = "";
  peso: string = "";
  temperatura: string = "";
  presion: string = "";
  key1: string = ""; //Libre
  key2: string = ""; //Libre
  dato1: string = ""; //Libre
  dato2: string = ""; //Libre

  error: string = "";

  constructor(private fb: FormBuilder,) { }
  @Output() historiaClinicaEvent = new EventEmitter<any>();
  @Input()hc!: HistoriaClinica ;

  ngOnInit(): void {
    console.log("YA EN EL OTRO LADO");
    console.log(this.hc);
    this.cargarFormulario();
    

  }


  Confirmar(opcion: boolean) {
    if (opcion == false) {
      this.historiaClinicaEvent.emit(null);
    }
  }

  onRegister() {
    var flag = this.validar();
    //todo completo
    if (flag) {
      var aux = {
        altura: this.altura,
        peso: this.peso,
        temperatura: this.temperatura,
        presion: this.presion,
        key1: this.key1,
        key2: this.key2,
        dato1: this.dato1,
        dato2: this.dato2,
      }
      // console.log(aux);
      this.historiaClinicaEvent.emit(aux);
    }
    else {
      this.historiaClinicaEvent.emit(null);
    }
  }

  cargarFormulario(){
    if(this.hc.altura != null){
      this.altura = this.hc.altura.toString();
    }
    if(this.hc.peso != null){
      this.peso = this.hc.peso.toString();
    }
    if(this.hc.temperatura != null){
      this.temperatura = this.hc.temperatura;
    }
    if(this.hc.presion != null){
      this.presion = this.hc.presion;
    }
    if(this.hc.key1 != null){
      this.key1 = this.hc.key1;
    }
    if(this.hc.key2 != null){
      this.key2 = this.hc.key2;
    }
    if(this.hc.dato1 != null){
      this.dato1 = this.hc.dato1;
    }
    if(this.hc.dato2 != null){
      this.dato2 = this.hc.dato2;
    }
  }

  validar(): boolean {
    var retorno = true;

    // if (this.altura != "") {
    //   this.error = "11"
    // }
    // if (this.peso != "") {
    //   this.error = "12"
    // } 
    // if (this.temperatura != "") {
    //   this.error = "13"
    // } 
    // if (this.presion != "") {
    //   this.error = "14"
    // } 

    return retorno;
  }
}
