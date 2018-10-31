import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import {
  ClientListComponent,
  ClientCreateUpdateComponent,
  ClientMainComponent,
  MainComponent,
  NotFoundComponent, 
  TechnicianCreateUpdateComponent, 
  TechnicianListComponent, 
  TechnicianMainComponent, 
  TicketMainComponent } from './components/pages';
import { StoreModule } from '@ngrx/store';
import { simpleReducer } from './reducers/simple.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ParceiroFormComponent } from './components/pages/parceiro-form/parceiro-form.component';
import { EnderecoComponent } from './components/pages/endereco/endereco.component';
import { EmailTelefoneComponent } from './components/pages/email-telefone/email-telefone.component';
import { ObservacoesComponent } from './components/pages/observacoes/observacoes.component';
import { TecnicoFormComponent } from './components/pages/tecnico-form/tecnico-form.component';
import { StatusAtivoInativoComponent } from './components/pages/status-ativo-inativo/status-ativo-inativo.component';
import { ChamadoComponent } from './components/pages/chamado-form/chamado.component';
import { DataHoraAgendamentoComponent } from './components/pages/data-hora-agendamento/data-hora-agendamento.component';
import { ClienteFormComponent } from './components/pages/cliente-form/cliente-form.component';
import { FuncionarioFormComponent } from './components/pages/funcionario-form/funcionario-form.component'; // Angular CLI environemnt


const appRoutes: Routes = [
  { path: 'clientes', component: ClienteFormComponent },
  { path: 'formsCliente', component: ClientCreateUpdateComponent },
  { path: 'formsCliente/:id', component: ClientCreateUpdateComponent },

  { path: 'parceiros', component: ParceiroFormComponent },
  {path: 'tecnicos', component: TecnicoFormComponent},
  { path: 'formsTecnico', component: TechnicianCreateUpdateComponent },
  { path: 'formsTecnico/:id', component: TechnicianCreateUpdateComponent },

  { path: 'chamados', component: ChamadoComponent },
  { path: 'funcionarios', component: FuncionarioFormComponent },
  
  // Colocar todas as rotas novas antes dessas duas abaixo..!
  { path: '', pathMatch: 'full', component: MainComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientCreateUpdateComponent,
    MainComponent,
    ClientMainComponent,
    NotFoundComponent,
    TechnicianCreateUpdateComponent,
    TechnicianListComponent,
    TechnicianMainComponent,
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
    FuncionarioFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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
