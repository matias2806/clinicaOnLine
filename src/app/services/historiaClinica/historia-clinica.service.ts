import { Injectable } from '@angular/core';
import { Turno } from 'src/Models/Turno';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MensajesService } from '../mensajes/mensajes.service';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HistoriaClinica } from 'src/Models/HistoriaClinica';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  private path = '/historiaClinicas';
  hClinicaColecction: AngularFirestoreCollection<HistoriaClinica>;
  public hclinicas: Observable<HistoriaClinica[]>;

  constructor(public db: AngularFirestore, private storage: AngularFireStorage, private AuthSvc: AuthService, private _Mservice: MensajesService) {
    this.hClinicaColecction = db.collection(this.path);

    this.hclinicas = this.hClinicaColecction.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        // console.log(a);
        const data = a.payload.doc.data() as unknown as HistoriaClinica;
        return data;
      });
    }));
  }

  obtenerHC(id: any) {
    return this.db.collection(this.path).doc(id);
  }
  
  alta(hclinica: HistoriaClinica) {
    console.log("Alta exitosa");
    return this.hClinicaColecction.add(JSON.parse(JSON.stringify(hclinica)));
  }

  traerTodos() {
    return this.hclinicas;
  }

  async obtenerKeyHC(hclinica: HistoriaClinica) {
    var aux = await this.db.collection(this.path).ref.where('id', '==', hclinica.id).get();
    if (aux.docs[0].exists) {
      return aux.docs[0].id;
    }
    else {
      return null;
    }
  }

  async obtenerKeyIdPacienteHC(hclinica: HistoriaClinica) {
    var aux = await this.db.collection(this.path).ref.where('idPaciente', '==', hclinica.idPaciente).get();
    if (aux.docs[0].exists) {
      return aux.docs[0].id;
    }
    else {
      return null;
    }
  }

  async obtenerKeyIdPacienteHC2(idPaciente: string) {
    var aux = await this.db.collection(this.path).ref.where('idPaciente', '==', idPaciente).get();
    if (aux.docs[0].exists) {
      return aux.docs[0].id;
    }
    else {
      return null;
    }
  }

  obtenerHCconKeyPaciente(idPaciente: string) {
    return this.hclinicas.pipe(map(dato => {
      return dato.filter(hc => {
        return (hc.idPaciente == idPaciente);
      });
    }));
  }

  public getHCPorId(id: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(this.path).get().subscribe((querySnapshot) => {
        let doc = querySnapshot.docs.find(doc => (doc.data() as HistoriaClinica).id == id);
        resolve(doc?.data());
      })
    });
  }

  updateHC(id: any, hc: HistoriaClinica, mensajeExitoso: string, mensajeFallo: string) {
    var hisCli = this.db.collection(this.path).doc(id);

    return hisCli.update({
      altura: hc.altura,
      peso: hc.peso,
      temperatura: hc.temperatura,
      presion: hc.presion,
      key1: hc.key1,
      key2: hc.key2,
      dato1: hc.dato1,
      dato2: hc.dato2,
      listadoTurnos: hc.listadoTurnos,
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
