import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../service/data-storage.service';
import { Ticket } from 'src/app/model/ticket';

@Component({
  selector: 'app-ticket-revisao',
  templateUrl: './ticket-revisao.component.html',
  styleUrls: ['./ticket-revisao.component.scss']
})
export class TicketRevisaoComponent implements OnInit {

  constructor(public dataStorage: DataStorageService) { }

  ngOnInit() {
    this.dataStorage.sync();
  }
  voltar() {
    this.dataStorage.ticket.estagio = this.dataStorage.ticket.estagio - 2;
    this.dataStorage.save();
  }
  salvar(){
    alert("To do..");
  }
}

