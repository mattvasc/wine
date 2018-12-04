import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tecnico } from '../model/tecnico';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient, private api: ApiService) { }


  private apiUrl = this.api.apiUrl;
  private posfixo = 'tecnicos';

  getAll(): Observable<Tecnico[]> {

    return this.http.get<Tecnico[]>(this.apiUrl + this.posfixo);
  }

  getAllofOneCompany(empresa_id: number): Observable<Tecnico[]> {

    return this.http.get<Tecnico[]>(this.apiUrl + this.posfixo + '/empresa/' + empresa_id);
  }

  getSingle(id: number): Observable<Tecnico> {

    return this.http.get<Tecnico>(this.apiUrl + this.posfixo + `/${id}`);
  }

  create(tec: Tecnico): Observable<any> {

    return this.http.post<Tecnico>(this.apiUrl + this.posfixo + '/', tec);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(this.apiUrl + this.posfixo + '/' + id.toString());
  }

  update(tec: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(this.apiUrl + this.posfixo + `/${tec.id}`, tec);
  }
}
