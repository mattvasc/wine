import { Component, OnInit } from '@angular/core';
import { EmpresaParceiraService } from '../../../../service/empresa-parceira.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaParceiraQuestionService } from '../../../../model_questions/empresa-parceira-question.service';
import { EmpresaParceira } from '../../../../model/empresa-parceira';

@Component({
  selector: 'app-empresa-parceira-create-update',
  templateUrl: './empresa-parceira-create-update.component.html',
  styleUrls: ['./empresa-parceira-create-update.component.scss']
})
export class EmpresaParceiraCreateUpdateComponent implements OnInit {
  public isSalvar: boolean = true;
  private epAtual: EmpresaParceira;
  private id: number;
  questions: any[];
  
  constructor(private questionsService: EmpresaParceiraQuestionService,
    private api: EmpresaParceiraService,
    private route: ActivatedRoute,
    private router: Router) {
    this.questions = questionsService.getQuestions();
  }


  ngOnInit() {
    this.epAtual = new EmpresaParceira();
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
          if (ret["data"] !== undefined) {
            // TODO: Verificar o success
            this.epAtual = ret["data"]["empresa_parceira"];

          } else {
            // TODO: Proteger a página, saindo dela quando informar id invalido
            alert("Acessando a pagina com um id inválido!");
            this.router.navigateByUrl('/');
          }
        });

      }

    });
  }

  exec(payload) {
    this.epAtual = <EmpresaParceira>payload;
    // console.log(this.epAtual);
    if (this.id === undefined)
      this.create();
    else
      this.update();
  }

  create() {
    // TODO: Validar Campos antes!
    // TODO: Mostrar modal de loading enquanto comunica com API
    this.api.create(this.epAtual).subscribe(valor => {
      console.log(valor);
      if (valor["success"] == true)
        alert("Empresa Parceira salva com sucesso!");
      else{
        console.log(valor);
        alert("Erro ao salvar Empresa Parceira!");
      }
      this.router.navigateByUrl("/empresasParceiras");
    });
  }
  update() {
    // TODO: Validar campos antes!
    // TODO: Mostrar modal de loading enquanto comunica com API
    this.api.update(this.epAtual).subscribe(valor => {
      if (valor["success"] == true)
        alert("Empresa Parceira salva com sucesso!");
      else {
        console.log(valor);
        alert("Erro ao salvar Empresa Parceira!");
      }
      this.router.navigateByUrl("/empresasParceiras");
    });
  }

}
