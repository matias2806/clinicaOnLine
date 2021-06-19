import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { map, finalize } from 'rxjs/operators';
import { observable, Observable } from 'rxjs';
import { Usuario } from '../../../Models/Usuario';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Dia } from 'src/Models/Dia';
import { MensajesService } from '../mensajes/mensajes.service';

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




  constructor(public db: AngularFirestore, private storage: AngularFireStorage, private AuthSvc: AuthService, private _Mservice: MensajesService) {
    this.usuariosColecction = db.collection(this.path);
    this.userPrueba = this.usuariosColecction.valueChanges();

    this.usuarios = this.usuariosColecction.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        // console.log(a);
        const data = a.payload.doc.data() as unknown as Usuario;
        data.auxId = a.payload.doc.id;
        return data;
      });
    }));
  }

  altaUsuario(usuario: Usuario) {
    console.log("Alta exitosa");
    return this.usuariosColecction.add(JSON.parse(JSON.stringify(usuario)));
  }

  traerTodos() {
    return this.usuarios;
  }


  public getUsuarioPorEmail(email: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(this.path).get().subscribe((querySnapshot) => {
        let doc = querySnapshot.docs.find(doc => (doc.data() as Usuario).email == email);
        resolve(doc?.data());
      })
    });
  }

  public getUsuarioPorTipoPerfil(tipoPerfil: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(this.path).get().subscribe((querySnapshot) => {
        let doc = querySnapshot.docs.find(doc => (doc.data() as Usuario).tipoPerfil == tipoPerfil);
        resolve(doc?.data());
      })
    });
  }

  obtenerEspecialistas() {
    return this.usuarios.pipe(map(dato => {
      return dato.filter(f => {
        return f.tipoPerfil == "Especialista";
      });
    }));
  }

  obtenerPacientes() {
    return this.usuarios.pipe(map(dato => {
      return dato.filter(f => {
        return f.tipoPerfil == "Paciente";
      });
    }));
  }



  async obtenerKeyUsuario(user: Usuario) {
    var aux = await this.db.collection(this.path).ref.where('email', '==', user.email).get();
    if (aux.docs[0].exists) {
      return aux.docs[0].id;
    }
    else {
      return null;
    }
  }


  updateDiasEspecialistas(id: any, user: Usuario) {
    var usuario = this.db.collection(this.path).doc(id);
    console.log(usuario);
    return usuario.update({
      diasDeAtencion: user.diasDeAtencion,
    })
      .then(() => {
        console.log("Documento actualizado!");
        this._Mservice.mensajeExitoso("Se actualizaron los horarios de atención");
      })
      .catch((error) => {
        console.error("Error en la actualizacion: ", error);
      });
  }

  updateAprovadoPorAdmin(id: any, user: Usuario) {
    var usuario = this.db.collection(this.path).doc(id);

    return usuario.update({
      aprovadoPorAdmin: user.aprovadoPorAdmin,
    })
      .then(() => {
        console.log("Documento actualizado!");
      })
      .catch((error) => {
        console.error("Error en la actualizacion: ", error);
      });
  }

  update2() {
    var cuidad1 = this.db.collection("cuidades").doc("j4EhEDKNm3BgRXx41GET");
    // console.log(cuidad1);

    return cuidad1.update({
      miCuidad: true,
      nombre: "Paraguay",
    })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
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

    setTimeout(() => {

      console.log("adentro22", usuario);
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

  public cargaHorarios() {
    let horarios = [];
    horarios.push({ id: 0, trabaja: true, dia: 'LUNES', inicia: '8:00', finaliza: '19:00' });
    horarios.push({ id: 1, trabaja: true, dia: 'MARTES', inicia: '8:00', finaliza: '19:00' });
    horarios.push({ id: 2, trabaja: true, dia: 'MIERCOLES', inicia: '8:00', finaliza: '19:00' });
    horarios.push({ id: 3, trabaja: true, dia: 'JUEVES', inicia: '8:00', finaliza: '19:00' });
    horarios.push({ id: 4, trabaja: true, dia: 'VIERNES', inicia: '8:00', finaliza: '19:00' });
    horarios.push({ id: 5, trabaja: true, dia: 'SABADO', inicia: '8:00', finaliza: '14:00' });

    return horarios;
  }

}
