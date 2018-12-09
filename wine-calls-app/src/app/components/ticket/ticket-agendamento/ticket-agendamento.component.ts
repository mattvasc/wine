import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../service/data-storage.service';
@Component({
  selector: 'app-ticket-agendamento',
  templateUrl: './ticket-agendamento.component.html',
  styleUrls: ['./ticket-agendamento.component.scss']
})
export class TicketAgendamentoComponent implements OnInit {
  public dataObj: Object;
  constructor(public dataStorage: DataStorageService) { }

  ngOnInit() {
    this.dataStorage.sync();
    this.dataObj = {};
  }

  voltar(){
    this.dataStorage.ticket.estagio = this.dataStorage.ticket.estagio - 1;
    this.dataStorage.save();
  }
  avancar(){
    this.dataStorage.ticket.data_inicio = this.dataObj['data'] + ' ' + this.dataObj['hora'];
    this.dataStorage.ticket.estagio = this.dataStorage.ticket.estagio + 1;
    this.dataStorage.save();
  }
  pular(){
    delete this.dataStorage.ticket.data_inicio;
    this.dataStorage.ticket.estagio = this.dataStorage.ticket.estagio + 1;
    this.dataStorage.save();
  }
}
