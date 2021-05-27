import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailEnviadoComponent } from './auth/email-enviado/email-enviado.component';
import { OpcionesDeUsuariosComponent } from './auth/opciones-de-usuarios/opciones-de-usuarios.component';
import { UsuarioComponent } from './auth/usuario/usuario.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register/:tipoPerfil', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'verificacion/:email', component:  EmailEnviadoComponent },
  { path: 'tiposDeRegistros', component:  OpcionesDeUsuariosComponent },
  { path: 'usuarios', component:  UsuarioComponent },
  { path: 'solicitarTurno', component:  SolicitarTurnoComponent },
  { path: 'miPerfil', component:  MiPerfilComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
