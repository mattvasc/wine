import { Component, OnInit } from '@angular/core';
import { Masks } from '../../../masks';
import { Funcionario } from '../../../model/funcionario';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { FuncionarioService } from '../../../service/funcionario.service';

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
    private funcionarioService: FuncionarioService
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
  exec(){
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
