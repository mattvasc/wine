import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpresaParceira } from '../../../../model/empresa-parceira';
import { Pagamento } from '../../../../model/pagamento';
import { EmpresaParceiraService } from '../../../../service/empresa-parceira.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from '../../../../model/endereco';
import { Masks } from '../../../../masks';
@Component({
  selector: 'app-parceiro-form',
  templateUrl: './parceiro-form.component.html',
  styleUrls: ['./parceiro-form.component.scss']
})
export class ParceiroFormComponent implements OnInit {

  public isPJ: String;
  public teste: String;
  private masks = Masks;
  private isSalvar: boolean;
  private id: number;
  private parceiroAtual: EmpresaParceira;
  private pagamentoAtual: Pagamento;

  constructor(private api: EmpresaParceiraService,
  private router: Router,
private route: ActivatedRoute) {
  
  this.isSalvar = true;
}

ngOnInit() {
  this.parceiroAtual = new EmpresaParceira();
  this.parceiroAtual.endereco = new Endereco();
  this.pagamentoAtual = new Pagamento();
  this.isPJ = 'juridica';
  
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
      this.api.getSingle(this.id).subscribe(ret => {
        console.log(ret);
        if (ret !== null) {
          // TODO: Verificar o success
          this.parceiroAtual = ret["data"]["empresa_parceira"];
          
        } else {
          // TODO: Proteger a página, saindo dela quando informar id invalido
          alert("Acessando a pagina com um id inválido!");
          this.router.navigateByUrl('/');
        }
      });
      
    }
    
  });
  
  console.log("**********");
  console.log(this.parceiroAtual);
  console.log("**********");
}

salvar() {
  // TODO: ARRUMAR ISSO AI
  delete this.parceiroAtual.data_rg;
  // TODO: Verificar dados
  this.parceiroAtual.pagamento = this.pagamentoAtual;
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
     this.parceiroAtual.pagamento = this.pagamentoAtual;
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
    if (this.isSalvar) {
      this.salvar();
    } else {
      this.atualizar();
    }
   }



}
