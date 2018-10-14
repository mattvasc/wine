import { Component, OnInit } from '@angular/core';
import { Technician } from '../technician';
import { TechnicianService } from '../technician.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-technician-create-update',
  templateUrl: './technician-create-update.component.html',
  styleUrls: ['./technician-create-update.component.scss']
})
export class TechnicianCreateUpdateComponent implements OnInit {
  private tecnicoAtual: Technician;
  private id: number;
  private sub: any;
  private textoBotao: String = 'Salvar';
  constructor(
    private api: TechnicianService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
    this.tecnicoAtual = new Technician();
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
        this.api.getTechnician(this.id).subscribe(ret => {
          if (ret !== null) {
            this.tecnicoAtual = ret;
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
      this.createTechnician();
    else
      this.updateTechnician();
  }

  createTechnician() {
    // TODO: Validar Campos antes!
    // TODO: Mostrar modal de loading enquanto comunica com API
    this.api.createTechnician(this.tecnicoAtual).subscribe(valor => {
      // TODO: Verificar se a api retornou cod 400 ou erro
      
      this.router.navigateByUrl("/tecnicos");
    
    });
  }
  updateTechnician() {
    // TODO: Validar campos antes!
    // TODO: Mostrar modal de loading enquanto comunica com API
    this.api.updateTechnician(this.tecnicoAtual).subscribe(valor => {
      // TODO: Verificar se a api retornou cod 400 ou erro
      this.router.navigateByUrl("/tecnicos");
    });
  }

}
