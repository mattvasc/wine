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
    this.api.getClients().subscribe(c => this.clients = c);
  }

}
