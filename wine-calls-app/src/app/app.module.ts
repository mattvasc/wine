import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt'; // <-- JWT Lives here
import { HttpClientModule } from '@angular/common/http';
import {
  ClientListPageComponent,
  ClientPageComponent,
  HomePageComponent,
  ErrorPageComponent,
  PartnerCompanyPageComponent,
  PartnerCompanyListPageComponent,
  PartnerCompanyFormPageComponent,
  LoginPageComponent,
  TicketPageComponent } from './components';
import { environment } from '../environments/environment';

import { TechnicianFormPageComponent } from './components/index';
import { TicketFormPageComponent } from './components/index';
import { ClientFormPageComponent } from './components/index';
import { EmployeeFormPageComponent } from './components/index';
import { TextMaskModule } from 'angular2-text-mask';
import { EmployeeListPageComponent } from './components/index';
import { TechnicianListPageComponent } from './components/index';

import { AuthService } from './service/auth.service';
import { SideMenuComponent } from './components/organisms/side-menu/side-menu.component';
import { DefaultTemplateComponent } from './components/templates/default-template/default-template.component';
import { FullPageTemplateComponent } from './components/templates/full-page-template/full-page-template.component';
// Angular CLI environemnt

const appRoutes: Routes = [
  { path: 'clientes', component: ClientPageComponent, canActivate: [AuthService] },
  { path: 'formsCliente', component: ClientFormPageComponent, canActivate: [AuthService]  },
  { path: 'formsCliente/:id', component: ClientFormPageComponent, canActivate: [AuthService]  },


  { path: 'empresasParceiras', component: PartnerCompanyPageComponent, canActivate: [AuthService]  },
  { path: 'formsEmpresaParceira', component: PartnerCompanyFormPageComponent, canActivate: [AuthService]  },
  { path: 'formsEmpresaParceira/:id', component: PartnerCompanyFormPageComponent, canActivate: [AuthService]  },

  { path: 'tecnicos', component: TechnicianListPageComponent, canActivate: [AuthService]},
  { path: 'formsTecnicoEmpresaParceira/:id', component: TechnicianFormPageComponent, canActivate: [AuthService]},
  { path: 'formsTecnicoEmpresaParceira', component: TechnicianFormPageComponent, canActivate: [AuthService]},

  { path: 'chamados', component: TicketPageComponent, canActivate: [AuthService]  },
  { path: 'formsTicket', component: TicketFormPageComponent, canActivate: [AuthService]  },
  { path: 'funcionarios', component: EmployeeListPageComponent, canActivate: [AuthService]  },
  { path: 'funcionario', component: EmployeeFormPageComponent, canActivate: [AuthService]  },
  { path: 'funcionario/:id', component: EmployeeFormPageComponent, canActivate: [AuthService]  },

  { path: 'login', component: LoginPageComponent },
  { path: 'error/:status', component: ErrorPageComponent },

  // Colocar todas as rotas novas antes dessas três abaixo..!
  { path: '', pathMatch: 'full', component: LoginPageComponent },
  { path: 'home', pathMatch: 'full', component: HomePageComponent, canActivate: [AuthService]  },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ClientListPageComponent,
    HomePageComponent,
    ClientPageComponent,
    ErrorPageComponent,
    PartnerCompanyFormPageComponent,
    TechnicianFormPageComponent,
    TicketFormPageComponent,
    ClientFormPageComponent,
    EmployeeFormPageComponent,
    TicketPageComponent,
    PartnerCompanyPageComponent,
    PartnerCompanyListPageComponent,
    LoginPageComponent,
    EmployeeListPageComponent,
    TechnicianListPageComponent,
    SideMenuComponent,
    DefaultTemplateComponent,
    FullPageTemplateComponent,
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
      // , { enableTracing: true } // <-- debugging purposes only
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
