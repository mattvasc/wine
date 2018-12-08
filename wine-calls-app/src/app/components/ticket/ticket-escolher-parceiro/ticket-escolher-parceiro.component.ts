import { Component, OnInit } from '@angular/core';
import { EmpresaParceira } from '../../../model/empresa-parceira';
import { EmpresaParceiraService } from '../../../service/empresa-parceira.service';
import { debounceTime } from 'rxjs/operators';  

import { DataStorageService } from '../../../service/data-storage.service';

@Component({
  selector: 'app-ticket-escolher-parceiro',
  templateUrl: './ticket-escolher-parceiro.component.html',
  styleUrls: ['./ticket-escolher-parceiro.component.scss']
})
export class TicketEscolherParceiroComponent implements OnInit {
  public parceirosPesquisados: EmpresaParceira[];
  public nome_input_string: string;

  constructor(
    private empresaParceiraService: EmpresaParceiraService,
    public dataStorage: DataStorageService
  ) { }

  ngOnInit() {
    this.parceirosPesquisados = [];
  }
  pesquisar(){
    this.empresaParceiraService.getWithName(this.nome_input_string)
    .pipe(debounceTime(50000))
    .subscribe(x => {
      if(x['success'] == true)
        this.parceirosPesquisados = x['data']['empresa_parceira'];
    });
  }
  voltar() {
    delete this.dataStorage.cliente;
    this.dataStorage.ticket = new Ticket();
    this.dataStorage.ticket.estagio = this.dataStorage.ticket.estagio - 1;
    this.dataStorage.save();
  }

}
