import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../service/data-storage.service';
import { Ticket } from 'src/app/model/ticket';
import { TicketService  } from '../../../service/ticket.service';

@Component({
  selector: 'app-ticket-revisao',
  templateUrl: './ticket-revisao.component.html',
  styleUrls: ['./ticket-revisao.component.scss']
})
export class TicketRevisaoComponent implements OnInit {

  constructor(
    public dataStorage: DataStorageService,
    private ticketService: TicketService
    ) { }

  ngOnInit() {
    this.dataStorage.sync();
    console.log(this.dataStorage.ticket);
  }
  voltar() {
    this.dataStorage.ticket.estagio = this.dataStorage.ticket.estagio - 2;
    this.dataStorage.save();
  }
  salvar(){
    this.ticketService.create(this.dataStorage.ticket).subscribe(success => {
      alert("Ticket salvo com sucesso!");
    }, failure => {
      console.log(failure);
      alert("Falha ao salvar Ticket");
    });
  }
}

