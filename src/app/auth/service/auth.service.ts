import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario: any = {};

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      // console.log("Estado del usuario", user);
      if (!user) {
        return;
      }
      this.usuario.email = user.email;
      this.usuario.uid = user.uid;
    });
  }

  async sendVerificationEmail():Promise<void>{
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log("bb", error.message);
    }
    return null;
  }

  async darUsuario(){
    return this.afAuth.currentUser;
  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.sendVerificationEmail();
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async logout() {
    try {
      this.usuario = {};
      await this.afAuth.signOut();
      //redirect o algo asi
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  GetCurrentUser2() {
    return this.afAuth.currentUser;
  }
}
