import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  
  constructor(public authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

    
  async onLogout(){
    
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login'])
    } catch (error) {
      console.log(error);
    }
  }
}
