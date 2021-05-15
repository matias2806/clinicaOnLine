import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private AuthSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    //console.log('form ->',this.loginForm.value);
    try {
      const user = this.AuthSvc.login(email, password);

      // .then((data)=> console.log(data));


      if (user) {
        //Redirect to home page
        console.log("imprimo", user);
        this.router.navigate(['/']);
      }
      else {
        console.log("else");
      }
    } catch (error) {
      console.log("aa", error);
    }
  }

  cargarAdmin() {
    this.loginForm.setValue({ email: 'admin@gmail.com', password: 'admin01' });
  }

}
