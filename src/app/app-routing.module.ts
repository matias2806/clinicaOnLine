import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailEnviadoComponent } from './auth/email-enviado/email-enviado.component';
import { OpcionesDeUsuariosComponent } from './auth/opciones-de-usuarios/opciones-de-usuarios.component';
import { UsuarioComponent } from './auth/usuario/usuario.component';
import { PageGraficosComponent } from './components/admin/page-graficos/page-graficos.component';
import { VerMiHCComponent } from './components/historiaClinica/ver-mi-hc/ver-mi-hc.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { MisTurnosEspecialistaComponent } from './components/mis-turnos-especialista/mis-turnos-especialista.component';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { CalificarComponent } from './components/opcionesTurno/calificar/calificar.component';
import { CancelarComponent } from './components/opcionesTurno/cancelar/cancelar.component';
import { EncuestaComponent } from './components/opcionesTurno/encuesta/encuesta.component';
import { FinalizarComponent } from './components/opcionesTurno/finalizar/finalizar.component';
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
  { path: 'misTurnos', component:  MisTurnosComponent },//PACIENTE
  { path: 'MisTurnos', component:  MisTurnosEspecialistaComponent },//ESPECIALISTA
  { path: 'miPerfil', component:  MiPerfilComponent },
  { path: 'cancelarTurno', component:  CancelarComponent },
  { path: 'finalizarTurno', component:  FinalizarComponent },
  { path: 'encuestaTurno', component:  EncuestaComponent },
  { path: 'calificarTurno', component:  CalificarComponent },
  { path: 'graficos', component:  PageGraficosComponent },
  { path: 'verMiHC', component:  VerMiHCComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
