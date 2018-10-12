import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Client } from '../client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  constructor(private api: ApiService) { }
  clients: Client[] = [];
  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.api.getClients().subscribe(c => this.clients = c);
  }

  deleteClient(id: number){
    console.log(`Indo apagar o cliente ${id}`);
    this.api.deleteClient(id).subscribe(c => console.log(c));
    // Se deletou com sucesso então affect rows não será igual a zero
  }

}
