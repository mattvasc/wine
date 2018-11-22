import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements  CanActivate {

  constructor(public router: Router) { }
  canActivate(): boolean {
      let logado = window.sessionStorage.getItem("logado");
      if (logado !== 'true') {
          this.router.navigateByUrl('/login');
          return false;
      }
      return true;
  }
}
