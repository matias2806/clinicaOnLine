import { Injectable } from '@angular/core';
import { Turno } from 'src/Models/Turno';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MensajesService } from '../mensajes/mensajes.service';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private path = '/turnos';
  turnosColecction: AngularFirestoreCollection<Turno>;
  public turnos: Observable<Turno[]>;

  constructor(public db: AngularFirestore, private storage: AngularFireStorage, private AuthSvc: AuthService, private _Mservice: MensajesService) {
    this.turnosColecction = db.collection(this.path);

    this.turnos = this.turnosColecction.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        // console.log(a);
        const data = a.payload.doc.data() as unknown as Turno;
        return data;
      });
    }));
  }


  alta(turno: Turno) {
    console.log("Alta exitosa");
    return this.turnosColecction.add(JSON.parse(JSON.stringify(turno)));
  }

  traerTodos() {
    return this.turnos;
  }

  async obtenerKeyTurno(turno: Turno) {
    var aux = await this.db.collection(this.path).ref.where('id', '==', turno.id).get();
    if (aux.docs[0].exists) {
      return aux.docs[0].id;
    }
    else {
      return null;
    }
  }

  obtenerTurnoDe(uid: string) {
    return this.turnos.pipe(map(dato => {
      return dato.filter(t => {
        return t.paciente!.uid == uid;
      });
    }));
  }

  obtenerTurnoProfesionalDe(uid: string) {
    return this.turnos.pipe(map(dato => {
      return dato.filter(t => {
        return t.profesional!.uid == uid;
      });
    }));
  }

  updateTurnoEstadosYcomentarios(id: any, turno: Turno, mensajeExitoso: string, mensajeFallo: string, flag1: boolean) {
    var tur = this.db.collection(this.path).doc(id);

    return tur.update({
      estado: turno.estado,
      comentarioPaciente: turno.comentarioPaciente,
      comentarioProfesional: turno.comentarioProfesional,
    })
      .then(() => {
        console.log("Documento actualizado!");
        if (flag1) {
          this._Mservice.mensajeExitoso(mensajeExitoso);
        } else {
          this._Mservice.mensajeExitosoCentrado("Turno aceptado");
        }
      })
      .catch((error) => {
        console.error("Error en la actualizacion: ", error);
        this._Mservice.mensajeExitoso(mensajeFallo);
      });
  }

  updateTurno(id: any, turno: Turno, mensajeExitoso: string, mensajeFallo: string) {
    var tur = this.db.collection(this.path).doc(id);

    return tur.update({
      id: turno.id,
      paciente: turno.paciente,
      profesional: turno.profesional,
      estado: turno.estado,
      hora: turno.hora,
      fecha: turno.fecha,
      especialidad: turno.especialidad,
      comentarioProfesional: turno.comentarioProfesional,
      comentarioPaciente: turno.comentarioPaciente,
      encuesta: turno.encuesta
    })
      .then(() => {
        console.log("Documento actualizado!");
        this._Mservice.mensajeExitoso(mensajeExitoso);
      })
      .catch((error) => {
        console.error("Error en la actualizacion: ", error);
        this._Mservice.mensajeExitoso(mensajeFallo);
      });
  }

}
