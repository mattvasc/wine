import { Injectable } from '@angular/core';
import {  HttpClient } from "@angular/common/http";
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl: string;
  
  constructor(private http: HttpClient, private api: ApiService) {
    this.apiUrl = this.api.apiUrl + 'tickets'
   }

   // Retorna a contagem de um tipo de chamado, ou a contagem de todos os chamados
   public getCountStatus(status: string = "todos"): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/count/' + status );
   }
}
