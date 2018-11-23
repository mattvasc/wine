import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { EmpresaParceira } from '../model/empresa-parceira';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

export class EmpresaParceiraService {

  constructor(private http: HttpClient, private api: ApiService) { }


  private apiUrl = this.api.apiUrl;
  private posfixo = 'EmpresasParceiras';

  getAll(): Observable<EmpresaParceira[]> {

    return this.http.get<EmpresaParceira[]>(this.apiUrl + this.posfixo );
  }

  getSingle(id: number): Observable<EmpresaParceira> {

    return this.http.get<EmpresaParceira>(this.apiUrl + this.posfixo + `/${id}`);
  }
  getFullSingle(id: number): Observable<EmpresaParceira> {
    return this.http.get<EmpresaParceira>(this.apiUrl + this.posfixo + `/full/${id}`);
  }

  create(ep: EmpresaParceira): Observable<EmpresaParceira> {

    return this.http.post<EmpresaParceira>(this.apiUrl + this.posfixo + '/create', ep, httpOptions);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(this.apiUrl + this.posfixo + '/' + id.toString());
  }

  update(ep: EmpresaParceira): Observable<EmpresaParceira> {
    return this.http.put<EmpresaParceira>(this.apiUrl + this.posfixo + `/${ep.id}`, ep, httpOptions);
  }
}
