import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';  
import { Technician } from "./technician";
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

export class TechnicianService {

  constructor(private http: HttpClient) {  }


  private apiUrl = 'http://localhost:3000/';
  public getTechnicians(): Observable<Technician[]> {
    // TODO: Por paginação aqui. (Limit e offset goes here)
    return this.http.get<Technician[]>(this.apiUrl + 'technicians');
  }

  public getTechnician(id: number): Observable<Technician> {

    return this.http.get<Technician>(this.apiUrl + `technicians/${id}`);
  }

  public createTechnician(c: Technician): Observable<Technician> {
    return this.http.post<Technician>(this.apiUrl + 'technicians', c, httpOptions);
  }

  public deleteTechnician(id: number): Observable<Object> {
    return this.http.delete(this.apiUrl+'technicians/'+id.toString());
  }

  public updateTechnician(c : Technician): Observable<Technician> {
    return this.http.put<Technician>(this.apiUrl + `technicians/${c.id}`, c, httpOptions);
  }
}
