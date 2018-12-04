import { Component, OnInit } from '@angular/core';
// import { CrudService } from '../../../../service/crud.service';
import { ClienteService } from '../../../../service/cliente.service';
import { Cliente } from '../../../../model/cliente';
import { Router } from '@angular/router';
import { DataStorageService } from '../../../../service/data-storage.service';

@Component({
  selector: 'app-client-list-page',
  templateUrl: './client-list-page.component.html',
  styleUrls: ['./client-list-page.component.scss']
})
export class ClientListPageComponent implements OnInit {


  constructor(
    private api: ClienteService,
    private router: Router,
    public dataStorage: DataStorageService
    ) { }

  clientes: Cliente[] = [];
  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.api.getAll().subscribe(c => {
      console.log(c);
      if (c['data']['cliente'] !== undefined) {
        this.clientes = c['data']['cliente'];
      }
    });
  }

  editClient(index: number) {
    this.dataStorage.cliente = this.clientes[index];
    this.router.navigateByUrl(`/formsCliente/`);
  }

  deleteClient(id: number) {
    console.log(`Indo apagar o cliente ${id}`);
    this.api.delete(id).subscribe(c => {
      console.log(c);
      alert('Cliente apagado com sucesso!');
      window.location.reload();
    });
    // Se deletou com sucesso então affect rows não será igual a zero
  }

}
