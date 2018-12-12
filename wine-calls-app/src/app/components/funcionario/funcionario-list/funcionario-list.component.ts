import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../../model/funcionario';
import { ApiService } from '../../../service/api.service';
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
  public count = 0;
  public pageSize: number = 8;
  public p;

  public funcionarios: Funcionario[] = [];
  public funcionarioAtual: Funcionario;
  constructor(
    private geral: ApiService,
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
    this.getPage(1, this.pageSize);
  }

  getPage(page: number, pageSize: number) {
    this.geral.getPaginate('funcionarios', pageSize, pageSize*(page-1)).subscribe(f => {
      if(f['success'] == true) {
        this.funcionarios = f["data"]['funcionario_wine'];
        this.count = f['count'];
      }
      else{
        this.modalWarning['message'] = 'Erro ao buscar funcionários ativos no sistema';
        this.modalWarning['title'] = 'Erro!';
        document.getElementById('openGenericModal').click();
      }
    });
  }

  changePage(event: any): void {
    this.p = event;
    this.getPage(event, this.pageSize);
  }

}
