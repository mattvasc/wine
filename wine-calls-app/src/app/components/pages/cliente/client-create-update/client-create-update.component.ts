import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../../service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteQuestionService } from '../../../../model_questions/cliente-question.service';
import { Cliente } from '../../../../model/cliente';

@Component({
  selector: 'app-client-create-update',
  templateUrl: './client-create-update.component.html',
  styleUrls: ['./client-create-update.component.scss'],
  providers:  [ClienteQuestionService]
})
export class ClientCreateUpdateComponent implements OnInit {
  public isSalvar: boolean = true;
  private clienteAtual: Cliente;
  private id: number;
  questions: any[];

  constructor(private questionsService: ClienteQuestionService,
    private api: ClienteService,
    private route: ActivatedRoute,
    private router: Router) {
      this.questions = questionsService.getQuestions();
     }


  ngOnInit() {
    this.clienteAtual = new Cliente();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // se o usuário acessou a pagina sem passar um id inteiro...
      if (this.id !== undefined && isNaN(this.id)) {
        // TODO: Proteger a página, saindo dela quando informar id invalido
        alert("Acessando a pagina de maneira inválida!");
        this.router.navigateByUrl('/');
      }
      // Se for um Update
      if (this.id !== undefined) {
        this.isSalvar = false;
        this.id = + this.id; // Cast string to int
        this.api.getSingle(this.id).subscribe(ret => {
          if (ret !== null) {
            // TODO: Verificar o success
            this.clienteAtual = ret["data"]["cliente"];
            
          } else {
            // TODO: Proteger a página, saindo dela quando informar id invalido
            alert("Acessando a pagina com um id inválido!");
            this.router.navigateByUrl('/');
          }
        });

      }

    });
  }
  
  exec(payload){
    this.clienteAtual = <Cliente>payload;
    // console.log(this.clienteAtual);
    if(this.id === undefined)
      this.createCliente(this.api, this.router);
    else
      this.updateCliente();
  }

  createCliente(api, router) {
    // TODO: Validar Campos antes!
    // TODO: Mostrar modal de loading enquanto comunica com API
    api.create(this.clienteAtual).subscribe(valor => {
      // TODO: Verificar se a api retornou cod 400 ou erro
      console.log(valor);
      if(valor["success"]==true)
        alert("Cliente salvo com sucesso!");
      else
        alert("Erro al salvar cliente");
    router.navigateByUrl("/clientes");
    
    });
  }
  updateCliente() {
    // TODO: Validar campos antes!
    // TODO: Mostrar modal de loading enquanto comunica com API
    this.api.update(this.clienteAtual).subscribe(valor => {
      // TODO: Verificar se a api retornou cod 400 ou erro
      this.router.navigateByUrl("/clientes");
    });
  }

}
