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
  public usuarioUnico: Observable<Usuario> | undefined;
  userPrueba: Observable<Usuario[]>;
  // public urlImage2: Observable<string>;

  constructor(public db: AngularFirestore, private storage: AngularFireStorage) {
    this.usuariosColecction = db.collection(this.path);
    this.userPrueba = this.usuariosColecction.valueChanges();

    this.usuarios = this.usuariosColecction.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        console.log(a);
        const data = a.payload.doc.data() as unknown as Usuario;
        data.auxId = a.payload.doc.id;
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

  public getUsuarioPorEmail(email: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(this.path).get().subscribe((querySnapshot) => {
        let doc = querySnapshot.docs.find(doc => (doc.data() as Usuario ).email == email);
        resolve(doc?.data());
      })
    });
  }

  update(id: string, data: any): Promise<void> {
    return this.usuariosColecction.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.usuariosColecction.doc(id).delete();
  }




  subirImagenConUid(uid: string, imagen: any) {
    let aux = "";
    this.filePath = `images/${uid}/${imagen.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, imagen);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImagen => {
        aux = urlImagen;
        //this.dowloadURL = urlImagen;
        // // console.log('URL_IMAGEN', urlImagen);
        // if (fotoNumero == 'f1') {
        //   usuario.URLfoto1 = urlImagen;
        // } else {
        //   usuario.URLfoto2 = urlImagen;
        // }
      })
      console.log("mi aux", aux);
      return aux;
    })).subscribe();
  }


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
