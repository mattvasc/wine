import { Component, OnInit } from '@angular/core';
// import { CrudService } from '../../../../service/crud.service';
import { ClienteService } from '../../../service/cliente.service';
import { ApiService } from '../../../service/api.service';
import { Cliente } from '../../../model/cliente';
import { Ticket } from '../../../model/ticket';
import { Router } from '@angular/router';
import { DataStorageService } from '../../../service/data-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  public modalWarning: {};
  public closeResult;
  public count = 0;
  public p;
  public pageSize: number = 8;
  public termoPesquisado: string;

  constructor(
    private geral: ApiService,
    private api: ClienteService,
    private router: Router,
    public dataStorage: DataStorageService,
    private modalService: NgbModal
    ) { }

  open(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  clientes: Cliente[] = [];
  ngOnInit() {
    this.termoPesquisado = '';
    this.modalWarning = {};
    this.modalWarning['title'] = '';
    this.modalWarning['message'] = '';

    this.getPage(1,this.pageSize);
  }


  getPage(page: number, pageSize: number) {
    this.api.getWithNamePaginated
    this.api.getWithNamePaginated(this.termoPesquisado, pageSize, pageSize*(page-1)).subscribe(c => {
      if (c['success']==true) {
        this.clientes = c['data']['cliente'];
        this.count = c['count'];
      }
    });
  }

  ticketForClient(index: number) {
    this.dataStorage.cliente = this.clientes[index];
    this.dataStorage.ticket = new Ticket();
    this.dataStorage.ticket.estagio = 2;
    this.dataStorage.ticket.cliente = this.dataStorage.cliente;
    this.dataStorage.ticket.cliente_nome = this.dataStorage.cliente.razao_social;
    this.dataStorage.ticket.cliente_id = this.dataStorage.cliente.id;
    this.dataStorage.save();
    this.router.navigateByUrl('/formsTicket');
  }


  changePage(event: any): void {
    this.p = event;
    this.getPage(event, 8);
  }

  editClient(index: number) {
    this.dataStorage.cliente = this.clientes[index];
    this.router.navigateByUrl(`/formsCliente/`);
  }

  deleteClient(index: number) {
    let id = this.clientes[index].id;
    console.log(`Indo apagar o cliente ${id}`);
    this.api.delete(id).subscribe(c => {

      if(c['success'] == true){
        this.modalWarning['message'] = 'Cliente apagado com sucesso!';
        this.modalWarning['title'] = 'Sucesso!';
        document.getElementById('openGenericModal').click();
        this.clientes.splice(index,1);
      } else {
        console.log(c);
        this.modalWarning['message'] = 'Erro ao tentar apagar cliente';
        this.modalWarning['title'] = 'Erro!';
        document.getElementById('openGenericModal').click();
      }
    }, err => {
        console.log(err);
        this.modalWarning['message'] = 'Erro ao tentar apagar cliente';
        this.modalWarning['title'] = 'Erro!';
        document.getElementById('openGenericModal').click();
    });
    // Se deletou com sucesso então affect rows não será igual a zero
  }

}
