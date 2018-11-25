import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpresaParceira } from '../../../model/empresa-parceira';
//import { Pagamento } from '../../../model/pagamento';
import { EmpresaParceiraService } from '../../../service/empresa-parceira.service';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { Endereco } from '../../../model/endereco';
import { Masks } from '../../../masks';
@Component({
  selector: 'app-parceiro-form',
  templateUrl: './parceiro-form.component.html',
  styleUrls: ['./parceiro-form.component.scss']
})
export class ParceiroFormComponent implements OnInit, AfterViewInit {

  public teste: String;
  private masks = Masks;
  private isSalvar: boolean;
  private id: number;
  private parceiroAtual: EmpresaParceira;
  //private pagamentoAtual: Pagamento;
  //private endereco: Endereco;

  constructor(
    private api: EmpresaParceiraService,
    private router: Router,
    private route: ActivatedRoute,
    private apiGeral: ApiService
  ) {
  
  this.isSalvar = true;
  //this.pagamentoAtual = new Pagamento();
  //this.pagamentoAtual.ispj = 0;
  //this.pagamentoAtual.isPoupanca = 0;
}

ngOnInit() {
  this.parceiroAtual = new EmpresaParceira();
 // this.endereco = new Endereco();
  //this.parceiroAtual.endereco = this.endereco;
  //this.parceiroAtual.pagamento = this.pagamentoAtual;
  
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
      console.log("Indo buscar o id tal" + this.id);
      this.api.getFullSingle(this.id).subscribe(ret => {
        console.log(ret);
        if (ret !== null) {
          // TODO: Verificar o success
          this.parceiroAtual = ret["data"];
          console.log(this.parceiroAtual);
          if(this.parceiroAtual.pgto_ispj == 1) {
            document.getElementById('pagamentopj').click();
          }
          else if(this.parceiroAtual.pgto_ispj == 0) {
            document.getElementById('pagamentopf').click();
          }
          //this.endereco = this.parceiroAtual.endereco;
          //this.pagamentoAtual = this.parceiroAtual.pagamento;
          
        } else {
          // TODO: Proteger a página, saindo dela quando informar id invalido
          alert("Acessando a pagina com um id inválido!");
          this.router.navigateByUrl('/');
        }
      });
      
    }
    
  });
}

ngAfterViewInit() {
    
}

buscaCEP(event: any) {
  event = event.replace('-','');
  event = event.replace('_','');
  if(event.length < 8)
    return;
  // Chamar api do CEP AQUI
  this.apiGeral.buscaCep(event).subscribe(retorno => {
    if(retorno['erro'] !== undefined && retorno['erro'] === true)
      return;
    if (retorno['logradouro'] !== undefined ) {
      this.logradouro = retorno['logradouro'];
    }
    if (retorno['bairro'] !== undefined) {
      this.bairro = retorno['bairro'];
    }
    if (retorno['localidade'] !== undefined) {
      this.cidade = retorno['localidade'];
    }
    if (retorno['uf'] !== undefined) {
      this.estado = retorno['uf'];
    }
  });
  
}
salvar() {
  // TODO: Verificar dados
  this.api.create(this.parceiroAtual).subscribe(retorno => {
    console.log(retorno);
    if(retorno !== undefined && retorno['success'] === true)
        {
          alert("Parceiro Salvo com Sucesso!");
        }
        else{
          alert("Deu ruim ao salvar Parceiro, sorry..");
        }
        this.router.navigateByUrl("/empresasParceiras");
     });
   }

   atualizar() {
     console.log("indo atalizar criente");
     // TODO: Verificar dados
     //this.parceiroAtual.pagamento = this.pagamentoAtual;
     this.api.update(this.parceiroAtual).subscribe(retorno => {
       console.log(retorno);
       if(retorno !== undefined && retorno['success'] === true)
        {
          alert("Parceiro Atualizado com Sucesso!");
        }
        else{
          alert("Deu ruim ao atualizar Parceiro, sorry..");
        }
        this.router.navigateByUrl("/empresasParceiras");
     });
   }

   exec() {
     console.log(this.parceiroAtual);
     //if(this.parceiroAtual.data_rg.length != 10)
      //delete this.parceiroAtual.data_rg;
    if (this.isSalvar) {
      this.salvar();
    } else {
      this.atualizar();
    }
   }



}
