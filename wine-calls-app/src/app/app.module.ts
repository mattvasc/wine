import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt'; // <-- JWT Lives here
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  ClienteListComponent,
  ClientMainComponent,
  MainComponent,
  NotFoundComponent,
  EmpresaParceiraMainComponent,
  EmpresaParceiraListComponent,
  ParceiroFormComponent,
  TicketRevisaoComponent,
  LoginComponent, 
  TicketEscolherClienteComponent,
  TicketInformacoesComponent,
  TicketEscolherTecnicoComponent,
  TicketAgendamentoComponent,
  TicketVerDetalhesComponent,
  TicketEscolherParceiroComponent,
  TicketMainComponent } from './components';

import { TecnicoFormComponent } from './components/index';
import { ChamadoComponent } from './components/index';
import { ClienteFormComponent } from './components/index';
import { FuncionarioFormComponent } from './components/index';
import { TextMaskModule } from 'angular2-text-mask';
import { FuncionarioListComponent } from './components/index';
import { TecnicoListComponent } from './components/index';

import { AuthService } from './service/auth.service';





// Angular CLI environemnt

const appRoutes: Routes = [
  { path: 'clientes', component: ClientMainComponent, canActivate: [AuthService] },
  { path: 'formsCliente', component: ClienteFormComponent, canActivate: [AuthService]  },
  { path: 'formsCliente/:id', component: ClienteFormComponent, canActivate: [AuthService]  },


  { path: 'empresasParceiras', component: EmpresaParceiraMainComponent, canActivate: [AuthService]  },
  { path: 'formsEmpresaParceira', component: ParceiroFormComponent, canActivate: [AuthService]  },
  { path: 'formsEmpresaParceira/:id', component: ParceiroFormComponent, canActivate: [AuthService]  },

  { path: 'tecnicos', component: TecnicoListComponent, canActivate: [AuthService]},
  { path: 'formsTecnicoEmpresaParceira/:id', component: TecnicoFormComponent, canActivate: [AuthService]},
  { path: 'formsTecnicoEmpresaParceira', component: TecnicoFormComponent, canActivate: [AuthService]},

  { path: 'chamados', component: TicketMainComponent, canActivate: [AuthService]  },
  { path: 'chamados/detalhes', component: TicketVerDetalhesComponent, canActivate: [AuthService]  },
  { path: 'formsTicket', component: ChamadoComponent, canActivate: [AuthService]  },
  { path: 'funcionarios', component: FuncionarioListComponent, canActivate: [AuthService]  },
  { path: 'funcionario', component: FuncionarioFormComponent, canActivate: [AuthService]  },
  { path: 'funcionario/first', component: FuncionarioFormComponent  },
  { path: 'funcionario/:id', component: FuncionarioFormComponent, canActivate: [AuthService]  },

  { path: 'login', component: LoginComponent },

  // Colocar todas as rotas novas antes dessas três abaixo..!
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'main', pathMatch: 'full', component: MainComponent, canActivate: [AuthService]  },
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
    FuncionarioListComponent,
    TecnicoListComponent,
    TicketEscolherClienteComponent,
    TicketInformacoesComponent,
    TicketAgendamentoComponent,
    TicketEscolherParceiroComponent,
    TicketRevisaoComponent,
    TicketEscolherTecnicoComponent,
    TicketVerDetalhesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
      //, { enableTracing: true } // <-- debugging purposes only
    ),
    JwtModule.forRoot({
      config: {
        tokenGetter:  () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
