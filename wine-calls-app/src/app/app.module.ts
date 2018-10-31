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
  LoginComponent,
  TicketMainComponent } from './components/pages';
import { StoreModule } from '@ngrx/store';
import { simpleReducer } from './reducers/simple.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';

// Angular CLI environemnt

const appRoutes: Routes = [
  { path: 'clientes', component: ClientMainComponent },
  { path: 'formsCliente', component: ClientCreateUpdateComponent },
  { path: 'formsCliente/:id', component: ClientCreateUpdateComponent },

  { path: 'empresasParceiras', component: EmpresaParceiraMainComponent },
  { path: 'formsEmpresaParceira', component: EmpresaParceiraCreateUpdateComponent },
  { path: 'formsEmpresaParceira/:id', component: EmpresaParceiraCreateUpdateComponent },

  { path: 'chamados', component: TicketMainComponent },
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
