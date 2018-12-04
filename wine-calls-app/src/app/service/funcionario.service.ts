import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../model/funcionario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient, private api: ApiService) { }

  private apiUrl = this.api.apiUrl;
  private posfixo = 'tecnicos';

  getAll(): Observable<any> {

    return this.http.get<any>(this.apiUrl + this.posfixo);
  }

  getSingle(id: number): Observable<any> {

    return this.http.get<any>(this.apiUrl + this.posfixo + `/${id}`);
  }

  create(func: Funcionario): Observable<any> {

    return this.http.post<any>(this.apiUrl + this.posfixo + '/', func);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(this.apiUrl + this.posfixo + '/' + id.toString());
  }

  update(func: Funcionario): Observable<any> {
    return this.http.put<any>(this.apiUrl + this.posfixo + `/${func.id}`, func);
  }
}
