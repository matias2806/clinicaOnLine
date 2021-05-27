import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Especialidad } from '../../../Models/Especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private path = '/especialidades';
  especialidadColecction: AngularFirestoreCollection<Especialidad>;
  public especialidades: Observable<Especialidad[]>;

  constructor(public db: AngularFirestore) { 
    this.especialidadColecction = db.collection(this.path);

    this.especialidades = this.especialidadColecction.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as unknown as Especialidad;
        return data;
      });
    }));
  }

  altaEspecialidad(especialidad : Especialidad){
    return this.especialidadColecction.add(JSON.parse( JSON.stringify(especialidad)));
  }

  traerTodos(){
    return this.especialidades;
  }

  traerPorNombre(nombre: string){
    return new Promise((resolve, reject) => {
      this.db.collection(this.path).get().subscribe((querySnapshot) => {
        let doc = querySnapshot.docs.find(doc => (doc.data() as Especialidad).nombre == nombre);
        resolve(doc?.data());
      })
    });
  }
}
