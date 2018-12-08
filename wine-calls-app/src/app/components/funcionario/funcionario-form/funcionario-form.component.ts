import { Component, OnInit } from '@angular/core';
import { Masks } from '../../../masks';
import { Funcionario } from '../../../model/funcionario';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { FuncionarioService } from '../../../service/funcionario.service';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent implements OnInit {
  public funcionarioAtual: Funcionario;
  public masks = Masks;
  public isSalvar = true;
  constructor(
    private router: Router,
    private auth: AuthService,
    private funcionarioService: FuncionarioService,
    private apiGeral: ApiService
  ) { }

  ngOnInit() {
    this.funcionarioAtual = new Funcionario();
    if(this.router.url == '/funcionario/first') {
      // Proteção de segurança do front end
      this.auth.checkIfIsEmptyOfEmployees().subscribe(retorno => {
        if(retorno['success'] != true || retorno['data']!= true)
          this.router.navigateByUrl('/login');
      });
    }

  }

  verificaNascimento(event: any){
    if(event.replace(/[^\d]+/g,'') < 8)
      return;

    if(!this.apiGeral.verificaDataAtual(event)){
      document.getElementById("campoDataNasc").classList.add("has-error");
    } else {
      document.getElementById("campoDataNasc").classList.remove("has-error");
      if(this.funcionarioAtual.data_rg !== undefined && !this.apiGeral.verificaDataExpedicao(this.funcionarioAtual.nascimento, this.funcionarioAtual.data_rg)){
        document.getElementById("campoDataRG").classList.add("has-error");
      } else {
        document.getElementById("campoDataRG").classList.remove("has-error");
      }
    }
  }

  verificaExpedicao(event: any){
    if(event.replace(/[^\d]+/g,'') < 8 || this.funcionarioAtual.nascimento === undefined || !this.apiGeral.verificaDataAtual(this.funcionarioAtual.nascimento))
      return;

    if(!this.apiGeral.verificaDataExpedicao(this.funcionarioAtual.nascimento, event)){
      document.getElementById("campoDataRG").classList.add("has-error");
    } else {
      document.getElementById("campoDataRG").classList.remove("has-error");
    }
  }

  verificaCPF(event: any) { // TODO: Completar função

  }

  exec(){
    if(this.funcionarioAtual.nascimento !== undefined && !this.apiGeral.verificaDataAtual(this.funcionarioAtual.nascimento)){
      alert("Dados inválidos");
      return;
    } else if (this.funcionarioAtual.nascimento !== undefined && this.funcionarioAtual.data_rg !== undefined && !this.apiGeral.verificaDataExpedicao(this.funcionarioAtual.nascimento, this.funcionarioAtual.data_rg)){
      alert("Dados inválidos");
      return;
    }

    // todo: verificação do input vem aqui
    if (this.isSalvar && this.router.url == '/funcionario/first')
      this.salvarGenesis();
    else if (this.isSalvar)
      this.salvar();
    else
      this.atualizar();
  }
  salvar() {
    this.funcionarioService.create(this.funcionarioAtual).subscribe(retorno => {
      if(retorno !== undefined && retorno['success'] === true)
        {
          alert("Funcionario Salvo com Sucesso!");
        }
        else{
          alert("Erro ao salvar Funcionario...");
        }
        this.router.navigateByUrl("/funcionarios");
    });
  }
  salvarGenesis(){
    this.funcionarioService.createFirst(this.funcionarioAtual).subscribe(retorno => {
      if(retorno !== undefined && retorno['success'] === true)
        {
          alert("Funcionario Salvo com Sucesso!");
        }
        else{
          console.log(retorno);
          alert("Erro ao salvar Funcionario...");
        }
        this.router.navigateByUrl("/login");
    });
  }
  atualizar(){
    this.funcionarioService.update(this.funcionarioAtual).subscribe(retorno => {
      if(retorno !== undefined && retorno['success'] === true)
      {
        alert("Funcionário Atualizado com Sucesso!");
      }
      else{
        alert("Erro ao atualizar Funcionario...");
      }
      this.router.navigateByUrl("/funcionarios");
    });
  }
}
