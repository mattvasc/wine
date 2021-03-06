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
    this.dataStorage.ticket.estagio = this.dataStorage.ticket.estagio - 1;
    this.dataStorage.save();
  }
  avancar(){
    this.dataStorage.ticket.estagio = this.dataStorage.ticket.estagio + 1;
    this.dataStorage.save();
  }

  pular(){
    delete this.dataStorage.empresa_parceira;
    delete this.dataStorage.tecnico;
    this.dataStorage.ticket.estagio = this.dataStorage.ticket.estagio + 2;
    this.dataStorage.save();
  }
  seePartner(index: number) {

  }

  selectPartner(index: number) {
    this.dataStorage.empresa_parceira = this.parceirosPesquisados[index];
    this.avancar();
  }
}
