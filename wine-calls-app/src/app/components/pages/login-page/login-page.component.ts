import { Component, OnInit } from '@angular/core';
// import { BetterService } from '../service/better.service';
// import { DataStorageService } from '../service/data-storage.service';
// import { Better } from '../model/better';
import { Router } from '@angular/router';
import { Funcionario } from '../../../model/funcionario';
import { AuthService } from '../../../service/auth.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
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
    const token = localStorage.getItem('token');
    if (token !== undefined && token !== null) {
      this.router.navigateByUrl(`/home`);
    }
  }
  erroAoFazerLogin() {
    // todo: mudar para modal
    alert('Credenciais Inválidas!');
  }
  login() {
    if (this.funcionario.email === '' || this.funcionario.senha === '') {
      return;
    }
    this.auth.doLogin(this.funcionario).subscribe(data => {
      if (data['success'] === true) {
        window.localStorage.setItem('token', data['data']);
        this.router.navigateByUrl(`/home`);
      } else {
        this.erroAoFazerLogin();
      }

    }, err => this.erroAoFazerLogin());

    // window.sessionStorage.setItem('logado', 'true');

    /*
        this.service.login(this.funcionario.email, this.funcionario.senha).subscribe(data => {
          console.log(data);
          if (data === undefined || data['payload'] === undefined) {
            alert('Error reaching server!');
          } else if (data['payload'] === null) {
            alert('Invalid Credentials');
          } else if (data['payload']['email'] === this.funcionario.email
          && data['payload']['senha'] === this.funcionario.senha) {
            console.log('passou');
            const tempbetter: Funcionario = data['payload'];
            this.data.better = tempbetter;

          } else {
            alert('Invalid Credentials');
          }

        }, error => { console.log(error); alert('Error reaching server'); });*/
  }
  recover() {

  }

  doAction() {
    const regex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
    if (!regex.test(this.funcionario.email)) {
      alert('Email inválido!');
      return;
    }

    if (this.isLogin) {
      this.login();
    } else {
      this.recover();
    }
  }
}
