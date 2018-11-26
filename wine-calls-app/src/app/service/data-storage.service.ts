import { Injectable } from '@angular/core';
import { EmpresaParceira } from '../model/empresa-parceira';
import { Funcionario } from '../model/funcionario';
import { Tecnico } from '../model/tecnico';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  public empresa_parceira: EmpresaParceira;
  public funcionario: Funcionario;
  public tecnico: Tecnico;
  public cliente: Cliente;
  constructor() {
    this.reset;
  }
  public reset() {
    this.empresa_parceira = undefined;
    this.funcionario = undefined;
    this.tecnico = undefined;
    this.cliente = undefined;
    sessionStorage.clear();
  }
  public sync() {
    let temp_empresa_parceira = sessionStorage.getItem("empresa_parceira");
    let temp_funcionario = sessionStorage.getItem("funcionario");
    let temp_tecnico = sessionStorage.getItem("tecnico");
    let temp_cliente = sessionStorage.getItem("cliente");

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

  public save(){
    (this.empresa_parceira === undefined) ? sessionStorage.removeItem("empresa_parceira") : sessionStorage.setItem("empresa_parceira", JSON.stringify(this.empresa_parceira));
    (this.tecnico === undefined) ? sessionStorage.removeItem("tecnico") : sessionStorage.setItem("tecnico", JSON.stringify(this.tecnico));
    (this.cliente === undefined) ? sessionStorage.removeItem("cliente") : sessionStorage.setItem("cliente", JSON.stringify(this.cliente));
    (this.funcionario === undefined) ? sessionStorage.removeItem("funcionario") : sessionStorage.setItem("funcionario", JSON.stringify(this.funcionario));
  }
}
