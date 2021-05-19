import { Especialidad } from "./Especialidad";

export class Usuario {
    public nombre: string = ''; //Obli
    public apellido: string = '';//Obli
    public edad: number = 0; //Obli
    public dni: number = 0; //Obli
    public email: string = ''; //Obli
    public contraseña: string = ''; //Obli
    public tipoPerfil: string = ''; //Obli
    public foto1: any; //Obli
    public uid?:any;//Obli

    public obraSocial?: string = ''; //Solo Paciente
    public foto2?: any; //Solo Paciente
    
    public especialidades?:Array<Especialidad>; //Solo Especialista

    public URLfoto1?:string; //Obli
    public URLfoto2?:string; //Solo paciente
}
