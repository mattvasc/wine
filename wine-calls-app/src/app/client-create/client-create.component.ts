import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Client } from '../client';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

  constructor(private api: ApiService) { }
  retorno: Client;
  ngOnInit() {
  }

  createClient(name: String, email: String) {
    let c = new Client(name, email);
    this.api.createClient(c).subscribe(valor => console.log(valor));
    console.log(c);
  }
}
