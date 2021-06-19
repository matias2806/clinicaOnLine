import { Usuario } from "./Usuario";
import { Turno } from "./Turno";


export class HistoriaClinica {
    id?: string = '';
    idPaciente: string = '';
    paciente: Usuario | null = null;

    altura: String = "0";
    peso: string = "0";
    temperatura: string = "0";
    presion: string = "0";
    key1: string = ""; //Libre
    key2: string = ""; //Libre
    dato1: string = ""; //Libre
    dato2: string = ""; //Libre

    listadoTurnos: Turno[] = []
}