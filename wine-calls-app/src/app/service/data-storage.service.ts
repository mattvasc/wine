import { Injectable } from '@angular/core';
import { EmpresaParceira } from '../model/empresa-parceira';
import { Funcionario } from '../model/funcionario';
import { Tecnico } from '../model/tecnico';
import { Cliente } from '../model/cliente';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  public empresa_parceira: EmpresaParceira;
  public funcionario: Funcionario; // para crud
  public usuario_logado: Funcionario; // logado no momento
  public tecnico: Tecnico;
  public cliente: Cliente;
  public ticket: Ticket;
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
    this.ticket = undefined;
    this.usuario_logado = undefined;
    localStorage.clear();
  }

  public resetAndKeepSession() {
    this.empresa_parceira = undefined;
    this.funcionario = undefined;
    this.tecnico = undefined;
    this.cliente = undefined;
    this.ticket = undefined;
    localStorage.removeItem("empresa_parceira");
    localStorage.removeItem("funcionario");
    localStorage.removeItem("ticket");
    localStorage.removeItem("cliente");
    localStorage.removeItem("tecnico");
  }

  // Busca informações do localstorage -- Serve para o site ficar imune a F5
  public sync() {
    let temp_empresa_parceira = localStorage.getItem("empresa_parceira");
    let temp_funcionario = localStorage.getItem("funcionario");
    let temp_tecnico = localStorage.getItem("tecnico");
    let temp_cliente = localStorage.getItem("cliente");
    let myrawtoken = window.localStorage.getItem("token");
    let temp_ticket = window.localStorage.getItem("ticket");

    if(this.usuario_logado === undefined && myrawtoken !== null){
      let decoded = this.helper.decodeToken(myrawtoken);
      this.usuario_logado = new Funcionario();
      this.usuario_logado.nome = decoded.nome;
      this.usuario_logado.email = decoded.email;
      this.usuario_logado.admin = decoded.admin;
    }

    if(this.ticket === undefined && temp_ticket !== null) {
      this.ticket = JSON.parse(temp_ticket);
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
    (this.tecnico === undefined) ? localStorage.removeItem("tecnico") : localStorage.setItem("tecnico", JSON.stringify(this.tecnico));
    (this.cliente === undefined) ? localStorage.removeItem("cliente") : localStorage.setItem("cliente", JSON.stringify(this.cliente));
    (this.ticket === undefined) ? localStorage.removeItem("ticket") : localStorage.setItem("ticket", JSON.stringify(this.ticket));
    (this.funcionario === undefined) ? localStorage.removeItem("funcionario") : localStorage.setItem("funcionario", JSON.stringify(this.funcionario));
    (this.empresa_parceira === undefined) ? localStorage.removeItem("empresa_parceira") : localStorage.setItem("empresa_parceira", JSON.stringify(this.empresa_parceira));
  }
}
