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
  ClientCreateUpdateComponent,
  ClientMainComponent,
  MainComponent,
  NotFoundComponent,
  EmpresaParceiraMainComponent,
  EmpresaParceiraCreateUpdateComponent,
  EmpresaParceiraListComponent,
  ParceiroFormComponent,
  LoginComponent,
  TicketMainComponent } from './components/pages';
import { StoreModule } from '@ngrx/store';
import { simpleReducer } from './reducers/simple.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EnderecoComponent } from './components/pages/endereco/endereco.component';
import { EmailTelefoneComponent } from './components/pages/email-telefone/email-telefone.component';
import { ObservacoesComponent } from './components/pages/observacoes/observacoes.component';
import { TecnicoFormComponent } from './components/pages/tecnico-form/tecnico-form.component';
import { StatusAtivoInativoComponent } from './components/pages/status-ativo-inativo/status-ativo-inativo.component';
import { ChamadoComponent } from './components/pages/chamado-form/chamado.component';
import { DataHoraAgendamentoComponent } from './components/pages/data-hora-agendamento/data-hora-agendamento.component';
import { ClienteFormComponent } from './components/pages/cliente/cliente-form/cliente-form.component';
import { FuncionarioFormComponent } from './components/pages/funcionario-form/funcionario-form.component'; // Angular CLI environemnt
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';

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
    ClientCreateUpdateComponent,
    MainComponent,
    ClientMainComponent,
    NotFoundComponent,
    TicketMainComponent,
    ParceiroFormComponent,
    EnderecoComponent,
    EmailTelefoneComponent,
    ObservacoesComponent,
    TecnicoFormComponent,
    StatusAtivoInativoComponent,
    ChamadoComponent,
    DataHoraAgendamentoComponent,
    ClienteFormComponent,
    FuncionarioFormComponent,
    TicketMainComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    EmpresaParceiraMainComponent,
    EmpresaParceiraCreateUpdateComponent,
    EmpresaParceiraListComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
      //, { enableTracing: true } // <-- debugging purposes only
    ),
    StoreModule.forRoot({ message: simpleReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
