import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../service/cliente.service';
import { DataStorageService } from '../../../service/data-storage.service';
import { Cliente } from '../../../model/cliente';
import { debounceTime } from 'rxjs/operators';  
import { Observable } from 'rxjs';


@Component({
  selector: 'app-ticket-escolher-cliente',
  templateUrl: './ticket-escolher-cliente.component.html',
  styleUrls: ['./ticket-escolher-cliente.component.scss']
})
export class TicketEscolherClienteComponent implements OnInit {
  public nome_input_string: String;
  public clientesPesquisados: Cliente[];

  constructor(
    private clienteService: ClienteService,
    private dataStorage: DataStorageService
  ) {

  }

  ngOnInit() {
    this.clientesPesquisados = [];
    
  }

  pesquisar() {
    this.clienteService.getWithName(this.nome_input_string)
    .pipe(debounceTime(50000))
    .subscribe(x => {
      if(x['success'] == true)
        this.clientesPesquisados = x['data']['cliente'];
    });
  }

  seeClient(index: number){
    // todo
  }

  selectClient(index: number) {
    this.dataStorage.ticket.client_id = this.clientesPesquisados[index].id;
    this.dataStorage.cliente = this.clientesPesquisados[index];
    this.dataStorage.ticket['estagio'] = 2;
    this.dataStorage.save();
  }

}
