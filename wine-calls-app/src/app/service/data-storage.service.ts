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
  }
}
