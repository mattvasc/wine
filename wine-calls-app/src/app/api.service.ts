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



export class ApiService {

  needsToUpdate: boolean;

  constructor(private http: HttpClient) {  this.needsToUpdate = false;  }


  private apiUrl = 'http://localhost:3000/';
  getClients(): Observable<Client[]> {

    return this.http.get<Client[]>(this.apiUrl + 'clients');
  }
  createClient(c: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl + 'clients', c, httpOptions);
  }

  deleteClient(id: number): Observable<Object> {
    return this.http.delete(this.apiUrl+'clients/'+id.toString());
  }

  /*
  Depois fazer essa parte pra tratar erros, tipo cliente repetido
  ou dados inválidos


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };*/
}
