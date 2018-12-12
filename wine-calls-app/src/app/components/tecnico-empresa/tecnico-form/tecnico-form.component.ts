import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../model/tecnico';
import { DataStorageService } from '../../../service/data-storage.service';
import { TecnicoService } from '../../../service/tecnico.service';
import { Router } from '@angular/router';
import { Masks } from '../../../masks';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tecnico-form',
  templateUrl: './tecnico-form.component.html',
  styleUrls: ['./tecnico-form.component.scss']
})

export class TecnicoFormComponent implements OnInit {
  public modalWarning: {};
  public closeResult;

  public tecnicoAtual: Tecnico;
  public cadastrar = true;
  public masks = Masks;

  constructor(
    private router: Router,
    public dataStorage: DataStorageService,
    private tecnicoService: TecnicoService,
    private modalService: NgbModal
  ) { }

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
    // todo: verificação do input vem aqui
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
          this.modalWarning['message'] = 'Tecnico Salvo com Sucesso!';
          this.modalWarning['title'] = 'Sucesso!';
          document.getElementById('openGenericModal').click();
        }
        else{
          this.modalWarning['message'] = 'Erro ao Salvar Tecnico';
          this.modalWarning['title'] = 'Erro!';
          document.getElementById('openGenericModal').click();
        }
        this.router.navigateByUrl("/tecnicos");
    });
  }
  atualizar(){
    this.tecnicoService.update(this.tecnicoAtual).subscribe(retorno => {
      if(retorno !== undefined && retorno['success'] === true)
      {
        this.modalWarning['message'] = 'Tecnico Atualizado com Sucesso!';
          this.modalWarning['title'] = 'Sucesso!';
          document.getElementById('openGenericModal').click();
      }
      else{
        this.modalWarning['message'] = 'Erro ao Atualizar Tecnico';
          this.modalWarning['title'] = 'Erro!';
          document.getElementById('openGenericModal').click();
      }
      this.router.navigateByUrl("/tecnicos");
    });

  }
  cancelar(){
    this.router.navigateByUrl("/tecnicos");
  }
}
