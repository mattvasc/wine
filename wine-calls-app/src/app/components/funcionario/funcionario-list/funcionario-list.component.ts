import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../../model/funcionario';
import { FuncionarioService } from '../../../service/funcionario.service';
import { DataStorageService } from '../../../service/data-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.scss']
})
export class FuncionarioListComponent implements OnInit {
  
  public modalWarning: {};
  public closeResult;

  public funcionarios: Funcionario[] = [];
  public funcionarioAtual: Funcionario;
  constructor(
    public dataStorage: DataStorageService,
    private funcionarioService: FuncionarioService,
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
    this.funcionarioAtual = this.dataStorage.usuario_logado;
    this.funcionarioService.getAll().subscribe(retorno => {
      console.log(retorno);
      if(retorno['success'] == true)
        this.funcionarios = retorno["data"]['funcionario_wine'];
      else{
        this.modalWarning['message'] = 'Erro ao buscar funcionários ativos no sistema';
        this.modalWarning['title'] = 'Erro!';
        document.getElementById('openGenericModal').click();
      }
    });
  }

}
