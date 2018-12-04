import { Component, OnInit } from '@angular/core';
// import { CrudService } from '../../../../service/crud.service';
import { ClienteService } from '../../../service/cliente.service';
import { Cliente } from '../../../model/cliente';
import { Router } from '@angular/router';
import { DataStorageService } from '../../../service/data-storage.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {


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
      if (c['data']["cliente"] !== undefined)
        this.clientes = c['data']['cliente']
    });
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
        alert("Cliente apagado com sucesso!");
        this.clientes.splice(index,1);
      } else {
        console.log(c);
        alert("Erro ao tentar apagar cliente");
      }
    }, err => {
        console.log(err);
        alert("Erro ao tentar apagar cliente");
    });
    // Se deletou com sucesso então affect rows não será igual a zero
  }

}
