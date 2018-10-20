import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientCreateUpdateComponent } from './client-create-update/client-create-update.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { ClientMainComponent } from './client-main/client-main.component';
import { NotFoundComponent, TechnicianCreateUpdateComponent, TechnicianListComponent, TechnicianMainComponent, TicketMainComponent } from './components/pages';
import { StoreModule } from '@ngrx/store';
import { simpleReducer } from './reducers/simple.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environemnt

const appRoutes: Routes = [
  { path: 'clientes', component: ClientMainComponent },
  { path: 'formsCliente', component: ClientCreateUpdateComponent },
  { path: 'formsCliente/:id', component: ClientCreateUpdateComponent },

  { path: 'tecnicos', component: TechnicianMainComponent },
  { path: 'formsTecnico', component: TechnicianCreateUpdateComponent },
  { path: 'formsTecnico/:id', component: TechnicianCreateUpdateComponent },

  { path: 'chamados', component: TicketMainComponent },
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
    TicketMainComponent
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
