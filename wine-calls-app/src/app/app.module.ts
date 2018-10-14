import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientCreateUpdateComponent } from './client-create-update/client-create-update.component';
import { ClientUpdateComponent } from './client-update/client-update.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { ClientMainComponent } from './client-main/client-main.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  {path:'clientes', component: ClientMainComponent},
  {path:'formsCliente', component: ClientCreateUpdateComponent},
  {path:'formsCliente/:id', component: ClientCreateUpdateComponent},
  // Colocar todas as rotas novas antes dessas duas abaixo..!
  { path: '', pathMatch: 'full', component: MainComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientCreateUpdateComponent,
    ClientUpdateComponent,
    MainComponent,
    ClientMainComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
      //, { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
