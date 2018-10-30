import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../service/client.service';
import { Cliente } from '../../../model/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  constructor(private api: ClienteService, private router: Router) { }
  clientes: Cliente[] = [];
  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.api.getClientes().subscribe(c => {
      this.clientes = c['data']['cliente']});
  }

  editClient(id: number) {
    this.router.navigateByUrl(`/formsCliente/${id}`);
  }

  deleteClient(id: number){
    console.log(`Indo apagar o cliente ${id}`);
    this.api.deleteCliente(id).subscribe(c => {
      console.log(c)
      alert("Cliente apagado com sucesso!");
      window.location.reload();
    });
    // Se deletou com sucesso então affect rows não será igual a zero
  }

}
