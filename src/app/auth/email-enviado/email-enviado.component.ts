import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-email-enviado',
  templateUrl: './email-enviado.component.html',
  styleUrls: ['./email-enviado.component.scss'],
  providers:[AuthService],
})
export class EmailEnviadoComponent implements OnInit {

  public user$: Observable<any> = this.AuthSvc.afAuth.user;

  constructor(private AuthSvc: AuthService,) { }

  ngOnInit(): void {
  }

  reenviarEmail(){
    this.AuthSvc.sendVerificationEmail();
  }

}
