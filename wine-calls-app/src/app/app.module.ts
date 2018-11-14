import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  ClienteListComponent,
  ClientMainComponent,
  MainComponent,
  NotFoundComponent,
  EmpresaParceiraMainComponent,
  EmpresaParceiraListComponent,
  ParceiroFormComponent,
  LoginComponent,
  TicketMainComponent } from './components';
import { environment } from '../environments/environment';

import { TecnicoFormComponent } from './components/index';
import { ChamadoComponent } from './components/index';
import { ClienteFormComponent } from './components/index';
import { FuncionarioFormComponent } from './components/index';
import { TextMaskModule } from 'angular2-text-mask';
// Angular CLI environemnt

const appRoutes: Routes = [
  { path: 'clientes', component: ClientMainComponent },
  { path: 'formsCliente', component: ClienteFormComponent },
  { path: 'formsCliente/:id', component: ClienteFormComponent },

  {path: 'tecnicos', component: TecnicoFormComponent},
  { path: 'empresasParceiras', component: EmpresaParceiraMainComponent },
  { path: 'formsEmpresaParceira', component: ParceiroFormComponent },
  { path: 'formsEmpresaParceira/:id', component: ParceiroFormComponent },

  { path: 'chamados', component: TicketMainComponent },
  { path: 'formsTicket', component: ChamadoComponent },
  { path: 'funcionarios', component: FuncionarioFormComponent },
  
  // Colocar todas as rotas novas antes dessas duas abaixo..!
  { path: '', pathMatch: 'full', component: MainComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ClienteListComponent,
    MainComponent,
    ClientMainComponent,
    NotFoundComponent,
    TicketMainComponent,
    ParceiroFormComponent,
    TecnicoFormComponent,
    ChamadoComponent,
    ClienteFormComponent,
    FuncionarioFormComponent,
    TicketMainComponent,
    EmpresaParceiraMainComponent,
    EmpresaParceiraListComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
      //, { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
