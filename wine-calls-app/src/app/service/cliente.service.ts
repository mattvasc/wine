import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { debounceTime } from 'rxjs/operators';  
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

  getAll(): Observable<Cliente[]> {

    return this.http.get<Cliente[]>(this.apiUrl + this.posfixo );
  }

  getSingle(id: number): Observable<Cliente> {

    return this.http.get<Cliente>(this.apiUrl + this.posfixo +`/${id}`);
  }

  getWithName(name: String){
    return this.http.get<any>(this.apiUrl + this.posfixo + `/nome/${name}`).pipe(debounceTime(50000));
  }

  create(c: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl + this.posfixo, c, httpOptions);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(this.apiUrl+ this.posfixo +'/'+id.toString());
  }

  update(c : Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.apiUrl + this.posfixo +`/${c.id}`, c, httpOptions);
  }
}
