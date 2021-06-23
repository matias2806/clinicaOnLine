import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EmailEnviadoComponent } from './auth/email-enviado/email-enviado.component';
import { UsuarioComponent } from './auth/usuario/usuario.component';
import { OpcionesDeUsuariosComponent } from './auth/opciones-de-usuarios/opciones-de-usuarios.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';

import { PipeHoraPipe } from './pipe/pipe-hora.pipe';


import { registerLocaleData } from '@angular/common';

// importar locales
import localePy from '@angular/common/locales/es-PY';
import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/en';
import localeEsAr from '@angular/common/locales/es-AR';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { CancelarComponent } from './components/opcionesTurno/cancelar/cancelar.component';
import { ErroresPipe } from './pipe/errores.pipe';
import { MisTurnosEspecialistaComponent } from './components/mis-turnos-especialista/mis-turnos-especialista.component';
import { FinalizarComponent } from './components/opcionesTurno/finalizar/finalizar.component';
import { EncuestaComponent } from './components/opcionesTurno/encuesta/encuesta.component';
import { CalificarComponent } from './components/opcionesTurno/calificar/calificar.component';
import { FiltroTurnosPipe } from './pipe/filtro-turnos.pipe';
import { FiltroTurnosProfesionalPipe } from './pipe/filtro-turnos-profesional.pipe';
import { HistoriaClinicaComponent } from './components/opcionesTurno/historia-clinica/historia-clinica.component';
import { DetalleHCComponent } from './components/historiaClinica/detalle-hc/detalle-hc.component';
import { PageGraficosComponent } from './components/admin/page-graficos/page-graficos.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import exporting from 'highcharts/modules/exporting.src.js';
import { ResaltarDirective } from './directives/resaltar.directive';
export function highchartModules() {
  return [exporting]
}
// registrar los locales con el nombre que quieras utilizar a la hora de proveer
// registerLocaleData(localePy, 'es');
// registerLocaleData(localePt, 'pt');
// registerLocaleData(localeEn, 'en')
registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    //RegisterComponent,
    NavbarComponent,
    EmailEnviadoComponent,
    UsuarioComponent,
    OpcionesDeUsuariosComponent,
    SolicitarTurnoComponent,
    MiPerfilComponent,
    PipeHoraPipe,
    MisTurnosComponent,
    CancelarComponent,
    ErroresPipe,
    MisTurnosEspecialistaComponent,
    FinalizarComponent,
    EncuestaComponent,
    CalificarComponent,
    FiltroTurnosPipe,
    FiltroTurnosProfesionalPipe,
    HistoriaClinicaComponent,
    DetalleHCComponent,
    PageGraficosComponent,
    ResaltarDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    ChartModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' },
  { provide: HIGHCHARTS_MODULES, useFactory: highchartModules }],
  bootstrap: [AppComponent]
})
export class AppModule { }
