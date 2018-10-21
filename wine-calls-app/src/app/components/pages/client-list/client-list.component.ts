import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../service/client.service';
import { Client } from '../../../service/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  constructor(private api: ClientService, private router: Router) { }
  clients: Client[] = [];
  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.api.getClients().subscribe(c => this.clients = c);
  }

  editClient(id: number) {
    this.router.navigateByUrl(`/formsCliente/${id}`);
  }

  deleteClient(id: number){
    console.log(`Indo apagar o cliente ${id}`);
    this.api.deleteClient(id).subscribe(c => console.log(c));
    // Se deletou com sucesso então affect rows não será igual a zero
  }

}
