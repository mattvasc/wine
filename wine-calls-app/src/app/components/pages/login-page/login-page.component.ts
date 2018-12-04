import { Component, OnInit } from '@angular/core';
// import { BetterService } from '../service/better.service';
// import { DataStorageService } from '../service/data-storage.service';
// import { Better } from '../model/better';
import { Router } from '@angular/router';
import { Funcionario } from '../../../model/funcionario';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  private funcionario: Funcionario;
  private easteregg = 0;
  constructor(
    // private service: BetterService,
    private router: Router,
    // private data: DataStorageService
    ) {
    this.funcionario = new Funcionario();
    this.funcionario.email = '';
    this.funcionario.senha = '';
  }

  ngOnInit() {
    const logado = sessionStorage.getItem('logado');
    if (logado !== undefined && logado !== null && logado === 'true') {
      this.router.navigateByUrl(`/home`);
    }
  }

  login() {
    if (this.funcionario.email === '' || this.funcionario.senha === '') {
      return;
    }
    this.router.navigateByUrl(`/home`);
    window.sessionStorage.setItem('logado', 'true');
    // this.service.login(this.actualBetter.username, this.actualBetter.password).subscribe(data => {
    //   console.log(data);
    //   if (data === undefined || data['payload'] === undefined) {
    //     alert('Error reaching server!');
    //   } else if (data['payload'] === null) {
    //     alert('Invalid Credentials');
    //   } else if (data['payload']['username'] === this.actualBetter.username
    //   && data['payload']['password'] === this.actualBetter.password) {
    //     console.log('passou');
    //     const tempbetter: Better = data['payload'];
    //     this.data.better = tempbetter;
    //
    //   } else {
    //     alert('Invalid Credentials');
    //   }

    // }, error => { console.log(error); alert('Error reaching server'); });
  }
}
