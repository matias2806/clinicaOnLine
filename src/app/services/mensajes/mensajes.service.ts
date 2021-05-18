import { Injectable } from '@angular/core';
// import { AngularFireDatabase, AngularFireList } from '@angular/fire/database/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Mensaje } from '../../../Models/Mensaje';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private dbpath = '/mensajes';
  mensajesRef: AngularFireList<Mensaje>;

  constructor(private db: AngularFireDatabase) {
    this.mensajesRef = db.list(this.dbpath);

  }


  getAll(): AngularFireList<Mensaje> {
    return this.mensajesRef;
  }


  create(mensaje: Mensaje): any {
    return this.mensajesRef.push(mensaje);
  }
}
