import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Tecnico } from '../model/tecnico';
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
export class TecnicoService {

  constructor(private http: HttpClient, private api: ApiService) { }


  private apiUrl = this.api.apiUrl;
  private posfixo = 'tecnicos';

  getAll(empresa_id: number): Observable<Tecnico[]> {

    return this.http.get<Tecnico[]>(this.apiUrl + this.posfixo);
  }

  getAllofOneCompany(empresa_id: number): Observable<Tecnico[]> {

    return this.http.get<Tecnico[]>(this.apiUrl + this.posfixo + '/empresa/' + empresa_id);
  }

  getSingle(id: number): Observable<Tecnico> {

    return this.http.get<Tecnico>(this.apiUrl + this.posfixo + `/${id}`);
  }

  create(ep: Tecnico): Observable<Tecnico> {

    return this.http.post<Tecnico>(this.apiUrl + this.posfixo + '/create', ep, httpOptions);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(this.apiUrl + this.posfixo + '/' + id.toString());
  }

  update(ep: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(this.apiUrl + this.posfixo + `/${ep.id}`, ep, httpOptions);
  }
}
