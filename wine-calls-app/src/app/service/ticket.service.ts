import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
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
    return this.http.get<any>(this.apiUrl + '/count/' + status);
  }

  // Retorna todos os chamados de um tipo, paginado
  public getWithStatus(status: string, limit: number, offset: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + `/status/${status}/limit/${limit}/offset/${offset}`);
  }

  public getFullWithStatus(status: string, limit: number, offset: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + `/full/status/${status}/limit/${limit}/offset/${offset}`);
  }

  update(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(this.apiUrl + `/${ticket.ticket_id}`, ticket);
  }

  upload(file: any, id: number): Observable<any> {
    let headers_arg = new HttpHeaders();
    headers_arg.append("Content-type", 'application/pdf');
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiUrl + `/upload/comprovante/${id}`, formData, { headers: headers_arg });
  }

  baixarPDF(ticket: Ticket) {
    let headers = new HttpHeaders();
    headers.append("Content-type", 'application/pdf');
    const options = { responseType: 'blob' as 'json' };
    return this.http.post<Blob>(this.apiUrl + '/ordemdeservico', ticket, options);

  }

  baixarEvidencia(ticket_id: number) {
    let headers = new HttpHeaders();
    headers.append("Content-type", 'application/pdf');
    const options = { responseType: 'blob' as 'json' };
    return this.http.get<Blob>(this.apiUrl + `/ordemdeservico/${ticket_id}`, options);

  }
  create(ticket: Ticket): Observable<any> {
    return this.http.post<Ticket>(this.apiUrl + '/', ticket);
  }
}
