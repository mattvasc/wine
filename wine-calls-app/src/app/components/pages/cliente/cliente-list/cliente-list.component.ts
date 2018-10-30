import { Component, OnInit } from '@angular/core';
// import { CrudService } from '../../../../service/crud.service';
import { ClienteService } from '../../../../service/cliente.service';
import { Cliente } from '../../../../model/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  constructor(private api: ClienteService, private router: Router) { }
  clientes: Cliente[] = [];
  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.api.getAll().subscribe(c => {
      if (c['data']["cliente"] !== undefined)
        this.clientes = c['data']['cliente']});
  }

  editClient(id: number) {
    this.router.navigateByUrl(`/formsCliente/${id}`);
  }

  deleteClient(id: number){
    console.log(`Indo apagar o cliente ${id}`);
    this.api.delete(id).subscribe(c => {
      console.log(c)
      alert("Cliente apagado com sucesso!");
      window.location.reload();
    });
    // Se deletou com sucesso então affect rows não será igual a zero
  }

}
