import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';  
import { Cliente } from '../model/cliente';
import {  HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { ApiService } from './api.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private api: ApiService) {  }


  private apiUrl = this.api.apiUrl;
  private posfixo = 'clientes'
  getClientes(): Observable<Cliente[]> {

    return this.http.get<Cliente[]>(this.apiUrl + this.posfixo );
  }

  getCliente(id: number): Observable<Cliente> {

    return this.http.get<Cliente>(this.apiUrl + this.posfixo +`/${id}`);
  }

  createCliente(c: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl + this.posfixo, c, httpOptions);
  }

  deleteCliente(id: number): Observable<Object> {
    return this.http.delete(this.apiUrl+ this.posfixo +'/'+id.toString());
  }

  updateCliente(c : Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.apiUrl + this.posfixo +`/${c.id}`, c, httpOptions);
  }
}
