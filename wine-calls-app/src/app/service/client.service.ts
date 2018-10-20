import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';  
import { Client } from "./client";
import {  HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {  }


  private apiUrl = 'http://localhost:3000/';
  getClients(): Observable<Client[]> {

    return this.http.get<Client[]>(this.apiUrl + 'clients');
  }

  getClient(id: number): Observable<Client> {

    return this.http.get<Client>(this.apiUrl + `clients/${id}`);
  }

  createClient(c: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl + 'clients', c, httpOptions);
  }

  deleteClient(id: number): Observable<Object> {
    return this.http.delete(this.apiUrl+'clients/'+id.toString());
  }

  updateClient(c : Client): Observable<Client> {
    return this.http.put<Client>(this.apiUrl + `clients/${c.id}`, c, httpOptions);
  }
}
