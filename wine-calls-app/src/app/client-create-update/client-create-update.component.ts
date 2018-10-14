import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client-create-update',
  templateUrl: './client-create-update.component.html',
  styleUrls: ['./client-create-update.component.scss']
})
export class ClientCreateUpdateComponent implements OnInit {
  private clienteAtual: Client;
  private id: number;
  private sub: any;
  private retorno: Client;
  private textoBotao: String = 'Salvar';
  constructor(
    private api: ClientService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
    this.clienteAtual = new Client("", "");
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      // se o usuário acessou a pagina sem passar um id inteiro...
      if (this.id !== undefined && isNaN(this.id)) {
        // TODO: Proteger a página, saindo dela quando informar id invalido
        alert("Acessando a pagina de maneira inválida!");
        this.router.navigateByUrl('/');
      }
      // Se for um Update
      if (this.id !== undefined) {
        this.textoBotao = "Atualizar";
        this.id = + this.id; // Cast string to int
        this.api.getClient(this.id).subscribe(ret => {
          if (ret !== null) {
            this.clienteAtual = ret;
          } else {
            // TODO: Proteger a página, saindo dela quando informar id invalido
            alert("Acessando a pagina com um id inválido!");
            this.router.navigateByUrl('/');
          }
        });

      }

    });
  }

  exec(){
    if(this.id === undefined)
      this.createClient();
    else
      this.updateClient();
  }

  createClient() {
    // TODO: Validar Campos antes!
    // TODO: Mostrar modal de loading enquanto comunica com API
    this.api.createClient(this.clienteAtual).subscribe(valor => {
      // TODO: Verificar se a api retornou cod 400 ou erro
      
      this.router.navigateByUrl("/clientes");
    
    });
  }
  updateClient() {
    // TODO: Validar campos antes!
    // TODO: Mostrar modal de loading enquanto comunica com API
    this.api.updateClient(this.clienteAtual).subscribe(valor => {
      // TODO: Verificar se a api retornou cod 400 ou erro
      this.router.navigateByUrl("/clientes");
    });
  }

}
