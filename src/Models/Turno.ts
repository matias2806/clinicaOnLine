import { Usuario } from "./Usuario";
import { Especialidad } from "./Especialidad";

export class Turno {
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
        servicioOnline: '',
        estadoEstablecimiento: '',
        recomiendaClinida: ''
    };
}

//Estados
// Pendiente todavia no se realizo