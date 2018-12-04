import { Component, OnInit } from '@angular/core';
import { Masks } from '../../../../masks';
import { Cliente } from '../../../../model/cliente';
import { ClienteService } from '../../../../service/cliente.service';
import { DataStorageService } from '../../../../service/data-storage.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../../service/api.service';


@Component({
  selector: 'app-client-form-page',
  templateUrl: './client-form-page.component.html',
  styleUrls: ['./client-form-page.component.scss']
})
export class ClientFormPageComponent implements OnInit {

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
        this.clienteAtual.municipio = retorno['localidade'];
      }
      if (retorno['uf'] !== undefined) {
        this.clienteAtual.estado = retorno['uf'];
      }
    }
    );
  }


  salvar() {
    // TODO: Verificar dados
    this.clienteService.create(this.clienteAtual).subscribe(retorno => {
      console.log(retorno);
      if (retorno !== undefined && retorno['success'] === true) {
        alert("Cliente Salvo com Sucesso!");
      }
      else {
        alert("Erro ao salvar Cliente...");
      }
      // this.router.navigateByUrl("/clientes");
    });
  }

  atualizar() {
    console.log("indo atalizar criente");
    // TODO: Verificar dados
    //this.clienteAtual.pagamento = this.pagamentoAtual;
    this.clienteService.update(this.clienteAtual).subscribe(retorno => {
      if (retorno !== undefined && retorno['success'] === true) {
        alert("Cliente Atualizado com Sucesso!");
      }
      else {
        alert("Erro ao atualizar Cliente...");
      }
      this.router.navigateByUrl("/clientes");
    });
  }

  exec() {
    console.log(this.clienteAtual);
    //if(this.clienteAtual.data_rg.length != 10)
    //delete this.clienteAtual.data_rg;
    if (this.cadastrar) {
      this.salvar();
    } else {
      this.atualizar();
    }
  }



}
