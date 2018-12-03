import { Injectable } from '@angular/core';
import { EmpresaParceira } from '../model/empresa-parceira';
import { Funcionario } from '../model/funcionario';
import { Tecnico } from '../model/tecnico';
import { Cliente } from '../model/cliente';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  public empresa_parceira: EmpresaParceira;
  public funcionario: Funcionario; // para crud
  public usuario_logado: Funcionario; // logado no momento
  public tecnico: Tecnico;
  public cliente: Cliente;
  private helper: JwtHelperService;
  constructor() {
    this.reset;
    this.helper = new JwtHelperService();

  }
  public reset() {
    this.empresa_parceira = undefined;
    this.funcionario = undefined;
    this.tecnico = undefined;
    this.cliente = undefined;
    this.usuario_logado = undefined;
    localStorage.clear();
  }

  // Busca informações do localstorage -- Serve para o site ficar imune a F5
  public sync() {
    let temp_empresa_parceira = localStorage.getItem("empresa_parceira");
    let temp_funcionario = localStorage.getItem("funcionario");
    let temp_tecnico = localStorage.getItem("tecnico");
    let temp_cliente = localStorage.getItem("cliente");
    let myrawtoken = window.localStorage.getItem("token");
    if(this.usuario_logado === undefined && myrawtoken !== null){
      let decoded = this.helper.decodeToken(myrawtoken);
      this.usuario_logado.nome = decoded.nome;
      this.usuario_logado.email = decoded.email;
    }
    if (this.empresa_parceira === undefined && temp_empresa_parceira !== null) {
      this.empresa_parceira = JSON.parse(temp_empresa_parceira);
    }
    if (this.funcionario === undefined && temp_funcionario !== null) {
      this.funcionario = JSON.parse(temp_funcionario);
    }
    if (this.tecnico === undefined && temp_tecnico !== null) {
      this.tecnico = JSON.parse(temp_tecnico);
    }
    if (this.cliente === undefined && temp_cliente !== null) {
      this.cliente = JSON.parse(temp_cliente);
    }
  }


  // Salva informações no localStorage -- Complemento pro Sync
  public save(){
    (this.empresa_parceira === undefined) ? localStorage.removeItem("empresa_parceira") : localStorage.setItem("empresa_parceira", JSON.stringify(this.empresa_parceira));
    (this.tecnico === undefined) ? localStorage.removeItem("tecnico") : localStorage.setItem("tecnico", JSON.stringify(this.tecnico));
    (this.cliente === undefined) ? localStorage.removeItem("cliente") : localStorage.setItem("cliente", JSON.stringify(this.cliente));
    (this.funcionario === undefined) ? localStorage.removeItem("funcionario") : localStorage.setItem("funcionario", JSON.stringify(this.funcionario));
  }
}
