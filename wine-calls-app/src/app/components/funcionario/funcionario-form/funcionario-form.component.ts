import { Component, OnInit } from '@angular/core';
import { Masks } from '../../../masks';
import { Funcionario } from '../../../model/funcionario';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { FuncionarioService } from '../../../service/funcionario.service';
import { ApiService } from '../../../service/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent implements OnInit {

  public modalWarning: {};
  public closeResult;
  public funcionarioAtual: Funcionario;
  public masks = Masks;
  public isSalvar = true;
  public erros: {};
  constructor(
    private router: Router,
    private auth: AuthService,
    private funcionarioService: FuncionarioService,
    private apiGeral: ApiService,
    private modalService: NgbModal
  ) { }

  open(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngOnInit() {

    this.modalWarning = {};
    this.modalWarning['title'] = '';
    this.modalWarning['message'] = '';

    this.erros = {
      "expedicao": false, "nascimento": false, "nascimentoVazio": false, "expedicaoVazio": false,
      "rgVazio": false, "emailVazio": false, "emailInvalido": false, "cpf": false, "cpfVazio": false,
      "nomeVazio": false, "nome_maeVazio": false, "senha1Vazio": false, "senha2Vazio": false, "senhasDiferentes": false
    };
    this.funcionarioAtual = new Funcionario();
    if (this.router.url == '/funcionario/first') {
      // Proteção de segurança do front end
      this.auth.checkIfIsEmptyOfEmployees().subscribe(retorno => {
        if (retorno['success'] != true || retorno['data'] != true)
          this.router.navigateByUrl('/login');
      });
    }
  }

  verificaNascimento(event: any) {
    if (event.replace(/[^\d]+/g, '') < 8)
      return;
    this.erros['nascimentoVazio'] = false;
    if (!this.apiGeral.verificaDataAtual(event)) {
      this.erros['nascimento'] = true;
    } else {
      this.erros['nascimento'] = false;
      if (this.funcionarioAtual.data_rg !== undefined && !this.apiGeral.verificaDataExpedicao(this.funcionarioAtual.nascimento, this.funcionarioAtual.data_rg)) {
        this.erros['expedicao'] = true;
      } else {
        this.erros['expedicao'] = false;
      }
    }
  }

  verificaExpedicao(event: any) {
    if (event.replace(/[^\d]+/g, '') < 8 || this.funcionarioAtual.nascimento === undefined || !this.apiGeral.verificaDataAtual(this.funcionarioAtual.nascimento))
      return;
    this.erros['expedicaoVazio'] = false;
    if (!this.apiGeral.verificaDataExpedicao(this.funcionarioAtual.nascimento, event)) {
      this.erros['expedicao'] = true;
    } else {
      this.erros['expedicao'] = false;
    }
  }

  verificaCPF() { // TODO: Completar função
    this.erros['cpfVazio'] = false;
    if (this.funcionarioAtual.cpf !== undefined && this.funcionarioAtual.cpf.replace(/\./g,'').replace(/-/g,'').replace(/_/g,'').length == 11) {
      this.erros['cpf'] = !this.apiGeral.validarCPF(this.funcionarioAtual.cpf);
    }
  }

  exec() {
    let sem_erros = true;
    if (this.funcionarioAtual.nascimento === undefined) {
      this.erros['nascimentoVazio'] = true;
      sem_erros = false;
    }
    if (sem_erros && !this.apiGeral.verificaDataAtual(this.funcionarioAtual.nascimento)) {
      sem_erros = false;
    }

    if (this.funcionarioAtual.data_rg === undefined) {
      sem_erros = false;
      this.erros['expedicaoVazio'] = true;
    }

    else if (this.funcionarioAtual.nascimento !== undefined && this.funcionarioAtual.data_rg !== undefined && !this.apiGeral.verificaDataExpedicao(this.funcionarioAtual.nascimento, this.funcionarioAtual.data_rg)) {
      sem_erros = false;
    }

    if (this.funcionarioAtual.email == undefined || this.funcionarioAtual.email.trim() == "") {
      sem_erros = false;
      this.erros['emailVazio'] = true;
    }

    if (this.funcionarioAtual.cpf == undefined || this.funcionarioAtual.cpf.replace(/\./g,'').replace(/-/g,'').replace(/_/g,'').length != 11) {
      sem_erros = false;
      this.erros['cpfVazio'] = true;
    }

    if(this.funcionarioAtual.cpf !== undefined && !this.apiGeral.validarCPF(this.funcionarioAtual.cpf)) {
      sem_erros = false;
      this.erros['cpf'] = true;
    }


    if (this.funcionarioAtual.nome == undefined || this.funcionarioAtual.nome == '') {
      sem_erros = false;
      this.erros['nomeVazio'] = true;
    }

    if (this.funcionarioAtual.nome_mae == undefined || this.funcionarioAtual.nome_mae == '') {
      sem_erros = false;
      this.erros['nome_maeVazio'] = true;
    }

    if (this.funcionarioAtual.rg == undefined || this.funcionarioAtual.rg == '') {
      sem_erros = false;
      this.erros['rgVazio'] = true;
    }
    if (this.funcionarioAtual.senha == undefined || this.funcionarioAtual.senha.trim() == "") {
      sem_erros = false;
      this.erros['senha1Vazio'] = true;
    }
    if (this.funcionarioAtual['senha2'] == undefined || this.funcionarioAtual['senha2'].trim() == "") {
      sem_erros = false;
      this.erros['senha2Vazio'] = true;
    }

    if (this.funcionarioAtual['senha2'] !== undefined && this.funcionarioAtual.senha !== undefined
      && this.funcionarioAtual.senha != this.funcionarioAtual['senha2']) {
      this.erros['senhasDiferentes'] = true;
      sem_erros = false;
    }


    if (sem_erros) {
      // todo: verificação do input vem aqui
      if (this.isSalvar && this.router.url == '/funcionario/first')
        this.salvarGenesis();
      else if (this.isSalvar)
        this.salvar();
      else
        this.atualizar();
    } else {
      this.modalWarning['message'] = 'Dados inválidos';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
    }
  }
  salvar() {
    this.funcionarioService.create(this.funcionarioAtual).subscribe(retorno => {
      if (retorno !== undefined && retorno['success'] === true) {
        this.modalWarning['message'] = 'Funcionario Salvo com Sucesso';
        this.modalWarning['title'] = 'Sucesso!';
        document.getElementById('openGenericModal').click();
      }
      else {
        this.modalWarning['message'] = 'Erro ao Salvar Funcionario';
        this.modalWarning['title'] = 'Erro!';
        document.getElementById('openGenericModal').click();
      }
      this.router.navigateByUrl("/funcionarios");
    }, () => {
      this.modalWarning['message'] = 'Erro ao Salvar Funcionario';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
    });
  }
  salvarGenesis() {
    this.funcionarioService.createFirst(this.funcionarioAtual).subscribe(retorno => {
      if (retorno !== undefined && retorno['success'] === true) {
        this.modalWarning['message'] = 'Funcionario Salvo com Sucesso';
        this.modalWarning['title'] = 'Sucesso!';
        document.getElementById('openGenericModal').click();
      }
      else {
        console.log(retorno);
        this.modalWarning['message'] = 'Erro ao Salvar Funcionario';
        this.modalWarning['title'] = 'Erro!';
        document.getElementById('openGenericModal').click();
      }
      this.router.navigateByUrl("/login");
    }, erro => {
      console.log(erro);
      this.modalWarning['message'] = 'Erro ao Salvar Funcionario';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
    });
  }
  atualizar() {
    this.funcionarioService.update(this.funcionarioAtual).subscribe(retorno => {
      if (retorno !== undefined && retorno['success'] === true) {
        this.modalWarning['message'] = 'Funcionario Atualizado com Sucesso';
        this.modalWarning['title'] = 'Sucesso!';
        document.getElementById('openGenericModal').click();
      }
      else {
        this.modalWarning['message'] = 'Erro ao Salvar Funcionario';
        this.modalWarning['title'] = 'Erro!';
        document.getElementById('openGenericModal').click();
      }
      this.router.navigateByUrl("/funcionarios");
    }, () => {
      this.modalWarning['message'] = 'Erro ao Salvar Funcionario';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
      this.router.navigateByUrl("/funcionarios");
    });
  }
}
