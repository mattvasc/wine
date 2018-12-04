import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Funcionario } from '../model/funcionario';
import { ApiService } from '../service/api.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(public router: Router,
    public apiService: ApiService,
    private http: HttpClient
  ) { }
  canActivate(): boolean {
    const helper = new JwtHelperService();
    const token = window.localStorage.getItem('token');
    if (token == null) {
      this.router.navigateByUrl('/login');
      return false;

    }
    if (helper.isTokenExpired(token)) {
      return false;
    } else {
      if ( Math.floor(helper.getTokenExpirationDate(token).getTime() / 1000 ) - Math.floor(Date.now() / 1000) < 180 ) {
        this.renewToken();
      }
      return true;
    }
  }

  doLogin(f: Funcionario) {
    return this.http.post(this.apiService.apiUrl + 'funcionarios/login', { 'email': f.email, 'senha': f.senha });
  }
  // Pede um novo JWT para continuar usando a API de forma válida.
  renewToken() {
    const token = window.localStorage.getItem('token');
    this.http.post<boolean>(this.apiService.apiUrl + 'funcionarios/isvalid', { 'token': token }).subscribe(data => {
        if (data['success'] === true) {
          window.localStorage.setItem('token', data['token']);
        } else {
          window.localStorage.removeItem('token');
        }
      }, err => {
          window.localStorage.removeItem('token');
      });
  }
}
