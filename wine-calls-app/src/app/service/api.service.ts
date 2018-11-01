import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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


  constructor(private http: HttpClient) {  }


  public apiUrl = 'http://localhost:3000/';
}
