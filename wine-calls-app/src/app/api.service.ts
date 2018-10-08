import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from "./client";
import { HttpClientModule, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/';
  getClients(): Observable<Client[]> {

    return this.http.get<Client[]>(this.apiUrl + 'clients');
  }
}
