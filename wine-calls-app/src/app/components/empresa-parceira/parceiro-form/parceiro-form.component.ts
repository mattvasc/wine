import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpresaParceira } from '../../../model/empresa-parceira';
//import { Pagamento } from '../../../model/pagamento';
import { EmpresaParceiraService } from '../../../service/empresa-parceira.service';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { Endereco } from '../../../model/endereco';
import { Masks } from '../../../masks';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-parceiro-form',
  templateUrl: './parceiro-form.component.html',
  styleUrls: ['./parceiro-form.component.scss']
})
export class ParceiroFormComponent implements OnInit, AfterViewInit {

  public modalWarning: {};
  public closeResult;

  public teste: String;
  public masks = Masks;
  private isSalvar: boolean;
  private id: number;
  private parceiroAtual: EmpresaParceira;
//   //private pagamentoAtual: Pagamento;
//   //private endereco: Endereco;

  constructor(
    private api: EmpresaParceiraService,
    private router: Router,
    private route: ActivatedRoute,
    private apiGeral: ApiService,
    private modalService: NgbModal
  ) {
  this.isSalvar = true;
}

open(content) {
  this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

ngOnInit() {
  this.modalWarning = {};
  this.modalWarning['title'] = '';
  this.modalWarning['message'] = '';
  this.parceiroAtual = new EmpresaParceira();
  this.atualizarCheckBoxes();
  this.route.params.subscribe(params => {
    this.id = params['id'];
    // se o usuário acessou a pagina sem passar um id inteiro...
    if (this.id !== undefined && isNaN(this.id)) {
      // TODO: Proteger a página, saindo dela quando informar id invalido
      this.modalWarning['message'] = 'Acessando a pagina de maneira inválida!';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
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
          this.parceiroAtual = ret["data"]['empresa_parceira'];
          this.atualizarCheckBoxes(); 
          //this.endereco = this.parceiroAtual.endereco;
          //this.pagamentoAtual = this.parceiroAtual.pagamento;

        } else {
          // TODO: Proteger a página, saindo dela quando informar id invalido
          this.modalWarning['message'] = 'Acessando a pagina com um id inválido!';
          this.modalWarning['title'] = 'Erro!';
          document.getElementById('openGenericModal').click();
          this.router.navigateByUrl('/');
        }
      });

    }

  });
}

atualizarCheckBoxes(){
  if(this.parceiroAtual.pgto_ispj == 1) {
    document.getElementById('pagamentopj').click();
  }
  else if(this.parceiroAtual.pgto_ispj == 0) {
    document.getElementById('pagamentopf').click();
  } 

  if(this.parceiroAtual.ispj == 1) {
    document.getElementById('chkpessoaJuridica').click();
  }
  else if(this.parceiroAtual.ispj == 0) {
    document.getElementById('chkpessoaFisica').click();
  }

  if(this.parceiroAtual.pgto_ispoupanca == 1) {
    document.getElementById('contaPoupanca').click();
  }
  else if(this.parceiroAtual.pgto_ispoupanca == 0) {
    document.getElementById('contaCorrente').click();
  }

}

ngAfterViewInit() {

}

buscaCEP(event: any) {
  event = event.replace('-','');
  event = event.replace('_','');
  if(event.length < 8)
    return;
 this.apiGeral.buscaCep(event).subscribe(retorno => {
    if(retorno['erro'] !== undefined && retorno['erro'] === true)
      return;
    if (retorno['logradouro'] !== undefined ) {
      this.parceiroAtual.logradouro = retorno['logradouro'];
    }
    if (retorno['bairro'] !== undefined) {
      this.parceiroAtual.bairro = retorno['bairro'];
    }
    if (retorno['localidade'] !== undefined) {
      this.parceiroAtual.cidade = retorno['localidade'];
    }
    if (retorno['uf'] !== undefined) {
      this.parceiroAtual.estado = retorno['uf'];
    }
  }
  );

}
salvar() {
  // TODO: Verificar dados
  this.api.create(this.parceiroAtual).subscribe(retorno => {
    if(retorno !== undefined && retorno['success'] === true)
        {
          this.modalWarning['message'] = 'Pareceiro Salvo com Sucesso!';
          this.modalWarning['title'] = 'Sucesso!';
          document.getElementById('openGenericModal').click();
          this.router.navigateByUrl("/empresasParceiras");
        }
        else{
          this.modalWarning['message'] = 'Erro ao Salvar Pareceiro';
          this.modalWarning['title'] = 'Erro!';
          document.getElementById('openGenericModal').click();
          console.log(retorno['error']);
        }
     });
   }

   atualizar() {
     console.log("indo atalizar criente");
     // TODO: Verificar dados
     //this.parceiroAtual.pagamento = this.pagamentoAtual;
     this.api.update(this.parceiroAtual).subscribe(retorno => {
       if(retorno !== undefined && retorno['success'] === true)
        {
          this.modalWarning['message'] = 'Pareceiro Atualizado com Sucesso!';
          this.modalWarning['title'] = 'Sucesso!';
          document.getElementById('openGenericModal').click();
        }
        else{
          this.modalWarning['message'] = 'Erro ao Atualizar Pareceiro';
          this.modalWarning['title'] = 'Erro!';
          document.getElementById('openGenericModal').click();
        }
        this.router.navigateByUrl("/empresasParceiras");
     });
   }

   cancelar() {
    this.router.navigateByUrl("/empresasParceiras");
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
