import { Usuario } from "./Usuario";
import { Especialidad } from "./Especialidad";


export class Turno {
    id: string = '';
    paciente: Usuario | null = null;
    profesional: Usuario | null = null;
    estado: string = 'PENDIENTE';
    hora: string = '';
    fecha: string = '';
    especialidad: Especialidad | null = null;
    comentarioProfesional: string = '';
    comentarioPaciente: string = '';
    encuesta: any = {
        atencionRecibida: '',
        volveria: '',
        sugerenciaMejora: '',
        opcion: false
    };
}

//Estados
// Pendiente todavia no se realizo