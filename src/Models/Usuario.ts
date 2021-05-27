import { Dia } from "./Dia";
import { Especialidad } from "./Especialidad";

export class Usuario {
    public nombre: string = ''; //Obli
    public apellido: string = '';//Obli
    public edad: number = 0; //Obli
    public dni: number = 0; //Obli
    public email: string = ''; //Obli
    public contraseña: string = ''; //Obli
    public tipoPerfil: string | null = ''; //Obli
    public foto1: any; //Obli
    public uid?: any;//Obli
    public URLfoto1?: string; //Obli

    public obraSocial?: string = ''; //Solo Paciente
    public foto2?: any; //Solo Paciente
    public URLfoto2?: string; //Solo paciente

    public especialidades?: Array<Especialidad>; //Solo Especialista
    public aprovadoPorAdmin?: boolean = true;//Solo Especialista
    public diasDeAtencion?: Array<Dia>;//Solo Especialista

    public auxId?: any;//Prueba


    // constructor(nombre: string, apellido: string, edad: number, email: string, contraseña: string, tipoPerfil: string, URLfoto1:string) {
    //     this.nombre = nombre;
    //     this.apellido = apellido;
    //     this.edad = edad;
    //     this.email = email;
    //     this.contraseña = contraseña;
    //     this.tipoPerfil = tipoPerfil;
    // }
}
