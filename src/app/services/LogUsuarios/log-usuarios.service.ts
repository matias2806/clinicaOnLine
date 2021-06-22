import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { map, finalize } from 'rxjs/operators';
import { observable, Observable } from 'rxjs';
import { Usuario } from '../../../Models/Usuario';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Dia } from 'src/Models/Dia';
import { MensajesService } from '../mensajes/mensajes.service';
import { LogUsuario } from 'src/Models/LogUsuario';

@Injectable({
  providedIn: 'root'
})
export class LogUsuariosService {
  private path = '/LogUsuarios';
  logColecction: AngularFirestoreCollection<LogUsuario>;
  
  public logueos: Observable<LogUsuario[]>;

  constructor(public db: AngularFirestore, private storage: AngularFireStorage, private AuthSvc: AuthService, private _Mservice: MensajesService) {
    this.logColecction = db.collection(this.path);

    this.logueos = this.logColecction.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        // console.log(a);
        const data = a.payload.doc.data() as unknown as LogUsuario;
        return data;
      });
    }));
  }

  altaLog(log: LogUsuario) {
    console.log("Alta exitosa");
    return this.logColecction.add(JSON.parse(JSON.stringify(log)));
  }

  traerTodos() {
    return this.logueos;
  }

}
