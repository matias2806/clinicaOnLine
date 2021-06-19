import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Usuario } from 'src/Models/Usuario';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  public usuario: any = null;

  constructor(public authSvc: AuthService, private _Uservice: UsuariosService, private router: Router) { }

  async ngOnInit() {
    this.user$.subscribe(async r => {
      if (r && r.email != null ) {
        var dataUser = await this._Uservice.getUsuarioPorEmail(r.email);
        this.usuario = dataUser;
      }
    });
  }

  async onLogout() {

    try {
      await this.authSvc.logout();
      this.router.navigate(['/home'])
    } catch (error) {
      console.log(error);
    }
  }
}
