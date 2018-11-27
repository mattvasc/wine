import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../model/tecnico';
import { DataStorageService } from '../../../service/data-storage.service';
import { TecnicoService } from '../../../service/tecnico.service';
import { Router } from '@angular/router';
import { Masks } from '../../../masks';
@Component({
  selector: 'app-tecnico-form',
  templateUrl: './tecnico-form.component.html',
  styleUrls: ['./tecnico-form.component.scss']
})
export class TecnicoFormComponent implements OnInit {
  public tecnicoAtual: Tecnico;
  public cadastrar = true;
  public masks = Masks;

  constructor(
    private router: Router,
    public dataStorage: DataStorageService,
    private tecnicoService: TecnicoService
  ) { }

  ngOnInit() {
    this.dataStorage.sync();
    if (this.dataStorage.empresa_parceira === undefined) {
      this.router.navigateByUrl('/empresasParceiras');
    }

    if (this.dataStorage.tecnico !== undefined) {
      this.tecnicoAtual = this.dataStorage.tecnico;
      this.tecnicoAtual.data_rg = this.tecnicoAtual.data_rg.substr(0,10);
      this.tecnicoAtual.nascimento = this.tecnicoAtual.nascimento.substr(0,10);
      this.cadastrar = false;
    } else {
      this.tecnicoAtual = new Tecnico();
      this.tecnicoAtual.empresa_do_tecnico_id = this.dataStorage.empresa_parceira.id;
      this.tecnicoAtual.status = "ativo";
    }
  }
  exec() {
    this.tecnicoAtual.cpf.replace('.','');
    if (this.cadastrar)
      this.salvar();
    else
      this.atualizar();
  }
  salvar(){
    this.tecnicoService.create(this.tecnicoAtual).subscribe(retorno => {
      if(retorno !== undefined && retorno['success'] === true)
        {
          alert("Tecnico Salvo com Sucesso!");
        }
        else{
          alert("Erro ao salvar Tecnico...");
        }
        this.router.navigateByUrl("/tecnicos");
    });
  }
  atualizar(){
    this.tecnicoService.update(this.tecnicoAtual).subscribe(retorno => {
      if(retorno !== undefined && retorno['success'] === true)
      {
        alert("Tecnico Atualizado com Sucesso!");
      }
      else{
        alert("Erro ao atualizar Tecnico...");
      }
      this.router.navigateByUrl("/tecnicos");
    });

  }
  cancelar(){
    this.router.navigateByUrl("/tecnicos");
  }
}
