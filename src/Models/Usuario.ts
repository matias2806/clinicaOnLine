export class Usuario {
    public nombre: string = ''; //Obli
    public apellido: string = '';//Obli
    public edad: number = 0; //Obli
    public dni: number = 0; //Obli
    public email: string = ''; //Obli
    public contraseña: string = ''; //Obli
    public tipoPerfil: string = ''; //Obli
    public foto1: any; //Obli

    public obraSocial: string = ''; //Solo Paciente
    public foto2: any; //Solo Paciente
    
    public especialidad: string = ''; //Solo Especialista
}
