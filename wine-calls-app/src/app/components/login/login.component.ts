import { Component, OnInit } from '@angular/core';
// import { BetterService } from '../service/better.service';
// import { DataStorageService } from '../service/data-storage.service';
// import { Better } from '../model/better';
import { Router } from '@angular/router';
import { Funcionario } from '../../model/funcionario';
import {AuthService} from '../../service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private funcionario: Funcionario;
  public isLogin = true;
  public modalWarning;
  private easteregg = 0;
  constructor(
    // private service: BetterService,
    private router: Router,
    private modalService: NgbModal,
    private auth: AuthService
    // private data: DataStorageService
    ) {
    this.funcionario = new Funcionario();
    this.funcionario.email = '';
    this.funcionario.senha = '';
  }

  open(content) {
    this.modalService.open(content, {centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  ngOnInit() {
    this.modalWarning = {};
    this.modalWarning['title'] = '';
    this.modalWarning['message'] = '';
    let token = localStorage.getItem('token');
    if(token !== undefined && token !== null)
      this.router.navigateByUrl(`/main`);
    this.auth.checkIfIsEmptyOfEmployees().subscribe(retorno => {
      if (retorno['success'] == true){
        if (retorno['data'] == true) {
          this.modalWarning['message'] = "Sistema Vazio! Cadastre o primeiro administrador!";
          this.modalWarning['title'] = 'Atenção!';
          document.getElementById('openGenericModal').click();
          this.router.navigateByUrl(`/funcionario/first`);
        }
      } else {
        this.modalWarning['message'] = "Erro interno!";
        this.modalWarning['title'] = 'Erro!';
        document.getElementById('openGenericModal').click();
      }
    }, erro => {
      console.log(erro);
      this.modalWarning['message'] = "Conexão perdida com o Servidor, tente novamente mais tarde";
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
      window.location.reload();
    });

  }
  erroAoFazerLogin() {
    this.modalWarning['message'] = "Credenciais Inválidas";
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
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
      this.modalWarning['message'] = 'Email no formato inválido, tente algo como login@winetecnologia.com.br';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();

      return;
    }
    
    if(this.isLogin)
      this.login();
    else
      this.recover();
  }
}
