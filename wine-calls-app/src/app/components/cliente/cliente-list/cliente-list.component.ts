import { Component, OnInit } from '@angular/core';
// import { CrudService } from '../../../../service/crud.service';
import { ClienteService } from '../../../service/cliente.service';
import { ApiService } from '../../../service/api.service';
import { Cliente } from '../../../model/cliente';
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
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  clientes: Cliente[] = [];
  ngOnInit() {
    this.modalWarning = {};
    this.modalWarning['title'] = '';
    this.modalWarning['message'] = '';

    this.getClientes();
  }

  getClientes() {
    this.api.getAll().subscribe(c => {
      console.log(c);
      if (c['data']["cliente"] !== undefined) {
        this.clientes = c['data']['cliente'];
        this.count = c['data']['cliente'].length;
        this.p = 0;
        this.getPage(1, 8);
      }
    });
  }

  getPage(page: number, pageSize: number) {
    this.geral.getPaginate('clientes', pageSize, pageSize*(page-1)).subscribe(c => {
      console.log(c);
      if (c['data']["cliente"] !== undefined)
        this.clientes = c['data']['cliente'];
    });
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
