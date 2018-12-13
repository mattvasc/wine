import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../service/cliente.service';
import { DataStorageService } from '../../../service/data-storage.service';
import { Cliente } from '../../../model/cliente';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-relatorio-cliente',
  templateUrl: './relatorio-cliente.component.html',
  styleUrls: ['./relatorio-cliente.component.scss']
})
export class RelatorioClienteComponent implements OnInit {
  public clientesPesquisados: Cliente[];
  public nome_input_string: String;
  public modalWarning;

  constructor(
    private clienteService: ClienteService,
    private modalService: NgbModal,
    private dataStorage: DataStorageService
  ) {

  }
  ngOnInit() {
    this.clientesPesquisados = [];
    this.modalWarning = {};
    this.modalWarning['title'] = '';
    this.modalWarning['message'] = '';
  }

  open(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  selectClient(index: number) {
    this.clienteService.getRelatorioPDF(this.clientesPesquisados[index].id).subscribe(ret => {
      const file = new Blob([ret], { type: 'application/pdf' });
      const fileURL = window.URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    }, error => {
      this.modalWarning['message'] = 'Erro ao gerar relatório, cliente não possuí chamados!';
      this.modalWarning['title'] = 'Atenção!';
      document.getElementById('openGenericModal').click();

    });
  }
  pesquisar() {
    this.clienteService.getWithNamePaginated(this.nome_input_string, 5, 0)
      .pipe(debounceTime(50000))
      .subscribe(x => {
        if (x['success'] == true)
          this.clientesPesquisados = x['data']['cliente'];
      });
  }
}
