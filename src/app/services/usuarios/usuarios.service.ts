import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { map, finalize } from 'rxjs/operators';
import { observable, Observable } from 'rxjs';
import { Usuario } from '../../../Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuario: any = {};
  private filePath: any;
  // private dowloadURL: Observable<string>;

  private path = '/usuarios';
  usuariosColecction: AngularFirestoreCollection<Usuario>;
  public usuarios: Observable<Usuario[]>;

  constructor(public db: AngularFirestore, private storage: AngularFireStorage) {
    this.usuariosColecction = db.collection(this.path);

    this.usuarios = this.usuariosColecction.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        console.log(a);
        const data = a.payload.doc.data() as unknown as Usuario;
        return data;
      });
    }));
  }

  altaUsuario(usuario: Usuario) {
    return this.usuariosColecction.add(JSON.parse(JSON.stringify(usuario)));
  }

  traerTodos() {
    return this.usuarios;
  }

  // addItem(newName: string) {
  //   this.itemsRef.push({ text: newName });
  // }
  updateItem(key: string, newText: string) {

    this.usuarios.subscribe(items=>{
      // this.db.doc(`jobs/${job.id}`).update({name:profile.name});
    })
  }
  // deleteItem(key: string) {
  //   this.itemsRef.remove(key);
  // }
  // deleteEverything() {
  //   this.itemsRef.remove();
  // }




  subirImagen(imagen: any, usuario: Usuario, fotoNumero: string) {
    this.filePath = `images/${usuario.uid}/${imagen.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, imagen);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImagen => {
        //this.dowloadURL = urlImagen;
        // console.log('URL_IMAGEN', urlImagen);
        if (fotoNumero == 'f1') {
          usuario.URLfoto1 = urlImagen;
        } else {
          usuario.URLfoto2 = urlImagen;
        }
      })
    })).subscribe();
  }

  async subirUsuarioCon2Imagenes(imagen: any, imagen2: any, usuario: Usuario) {

    this.subirImagen(imagen, usuario, 'f1');
    this.subirImagen(imagen2, usuario, 'f2');

    console.log("estoy");
    setTimeout(() => {

      console.log("adentro", usuario);
      this.altaUsuario(usuario);
    }, 3000);
  }

  async subirUsuarioCon1Imagenes(imagen: any, usuario: Usuario) {

    this.subirImagen(imagen, usuario, 'f1');
    setTimeout(() => {
      // console.log("adentro",usuario);
      this.altaUsuario(usuario);
    }, 2000);
  }


}
