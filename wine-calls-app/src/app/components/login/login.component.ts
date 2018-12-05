import { Component, OnInit } from '@angular/core';
// import { BetterService } from '../service/better.service';
// import { DataStorageService } from '../service/data-storage.service';
// import { Better } from '../model/better';
import { Router } from '@angular/router';
import { Funcionario } from '../../model/funcionario';
import {AuthService} from '../../service/auth.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private funcionario: Funcionario;
  public isLogin = true;
  private easteregg = 0;
  constructor(
    // private service: BetterService,
    private router: Router,
    private auth: AuthService
    // private data: DataStorageService
    ) {
    this.funcionario = new Funcionario();
    this.funcionario.email = '';
    this.funcionario.senha = '';
  }
  
  ngOnInit() {
    let token = localStorage.getItem('token');
    if(token !== undefined && token !== null)
      this.router.navigateByUrl(`/main`);
    this.auth.checkIfIsEmptyOfEmployees().subscribe(retorno => {
      if(retorno['success'] == true && retorno['data'] == true) {
        alert("Sistema vazio! Cadastre o primeiro Administrador");
        this.router.navigateByUrl(`/funcionario/first`);
      }
    });

  }
  erroAoFazerLogin() {
    // todo: mudar para modal
    alert("Credenciais Inválidas!");
  }
  login() {
    if (this.funcionario.email === '' || this.funcionario.senha === '') {
      return;
    }
    this.auth.doLogin(this.funcionario).subscribe(data => {
      if(data['success'] == true) {
        window.localStorage.setItem("token", data['data']);
        this.router.navigateByUrl(`/main`);
      }
      else
        this.erroAoFazerLogin();
      
    }, err => this.erroAoFazerLogin());
  }
  recover() {

  }

  doAction() {
    let regex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
    if(!regex.test(this.funcionario.email))
    {
      alert("Email inválido!");
      return;
    }
    
    if(this.isLogin)
      this.login();
    else
      this.recover();
  }
}
