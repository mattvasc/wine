import { Injectable } from '@angular/core';
import {  HttpClient } from "@angular/common/http";
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Ticket } from '../model/ticket';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl: string;
  private posfixo: string = '/tickets';
  constructor(private http: HttpClient, private api: ApiService) {
    this.apiUrl = this.api.apiUrl + 'tickets'
   }

   // Retorna a contagem de um tipo de chamado, ou a contagem de todos os chamados
   public getCountStatus(status: string = "todos"): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/count/' + status );
   }

   create(ticket: Ticket): Observable<any> {
    return this.http.post<Ticket>(this.apiUrl + this.posfixo + '/', ticket);
  }
}
