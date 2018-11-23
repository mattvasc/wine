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

  { path: 'tecnicos/:id', component: TecnicoListComponent, canActivate: [AuthService]},
  { path: 'formsTecnicoEmpresaParceira', component: TecnicoFormComponent, canActivate: [AuthService]},

  { path: 'chamados', component: TicketMainComponent, canActivate: [AuthService]  },
  { path: 'formsTicket', component: ChamadoComponent, canActivate: [AuthService]  },
  { path: 'funcionarios', component: FuncionarioFormComponent, canActivate: [AuthService]  },

  { path: 'login', component: LoginComponent },

  // Colocar todas as rotas novas antes dessas duas abaixo..!
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
