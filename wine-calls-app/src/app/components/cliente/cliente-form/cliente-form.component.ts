import { Component, OnInit } from '@angular/core';
import { Masks } from '../../../masks';
import { Cliente } from '../../../model/cliente';
import { ClienteService } from '../../../service/cliente.service';
import { DataStorageService } from '../../../service/data-storage.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';


@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  public clienteAtual: Cliente;
  public cadastrar = true;
  private masks: any;
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    public dataStorage: DataStorageService,
    private apiGeral: ApiService
  ) {
    this.masks = Masks;
  }


  ngOnInit() {
    if (this.dataStorage.cliente !== undefined) {
      this.cadastrar = false;
      this.clienteAtual = this.dataStorage.cliente;
    }
    else {
      this.clienteAtual = new Cliente();
      this.clienteAtual.status = "ativo";
    }

  }


  buscaCEP(event: any) {
    event = event.replace('-', '');
    event = event.replace('_', '');
    if (event.length < 8)
      return;
    this.apiGeral.buscaCep(event).subscribe(retorno => {
      if (retorno['erro'] !== undefined && retorno['erro'] === true)
        return;
      if (retorno['logradouro'] !== undefined) {
        this.clienteAtual.logradouro = retorno['logradouro'];
      }
      if (retorno['bairro'] !== undefined) {
        this.clienteAtual.bairro = retorno['bairro'];
      }
      if (retorno['localidade'] !== undefined) {
        this.clienteAtual.cidade = retorno['localidade'];
      }
      if (retorno['uf'] !== undefined) {
        this.clienteAtual.estado = retorno['uf'];
      }
    }
    );
  }

  verificaCNPJ(event: any) {
    event = event.replace(/[^\d]+/g,'');
    if(event.length < 14)
      return;
    if(!this.apiGeral.validarCNPJ(event)){
      document.getElementById("campoCNPJ").classList.add("has-error");
    } else {
      document.getElementById("campoCNPJ").classList.remove("has-error");
    }
  }


  salvar() {
    // TODO: Verificar dados
    this.clienteService.create(this.clienteAtual).subscribe(retorno => {
      console.log(retorno);
      if (retorno !== undefined && retorno['success'] === true) {
        alert("Cliente Salvo com Sucesso!");
        this.router.navigateByUrl("/clientes");
      }
      else {
        alert("Erro ao salvar Cliente...");
      }
      
    });
  }

  cancelar(){
    this.router.navigateByUrl("/clientes");
  }
  atualizar() {
    console.log("indo atalizar criente");
    // TODO: Verificar dados
    //this.clienteAtual.pagamento = this.pagamentoAtual;
    this.clienteService.update(this.clienteAtual).subscribe(retorno => {
      if (retorno !== undefined && retorno['success'] === true) {
        alert("Cliente Atualizado com Sucesso!");
        this.router.navigateByUrl("/clientes");
      }
      else {
        alert("Erro ao atualizar Cliente...");
      }
      this.router.navigateByUrl("/clientes");
    });
  }

  exec() {
    console.log(this.clienteAtual);
    if(!this.apiGeral.validarCNPJ(this.clienteAtual.cnpj)){
      alert("Dados inválidos");
      return;
    }
    if (this.cadastrar) {
      this.salvar();
    } else {
      this.atualizar();
    }
  }
}
