import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../service/data-storage.service';
import { Ticket } from 'src/app/model/ticket';
import { TicketService } from '../../../service/ticket.service';
@Component({
  selector: 'app-ticket-ver-detalhes',
  templateUrl: './ticket-ver-detalhes.component.html',
  styleUrls: ['./ticket-ver-detalhes.component.scss']
})
export class TicketVerDetalhesComponent implements OnInit {
  public chamados: Ticket[];
  public quantidade: number;
  public ticket_status: string;
  constructor(
    public dataStorage: DataStorageService,
    private ticketService: TicketService
  ) { }

  ngOnInit() {
    this.ticket_status = this.dataStorage.ticket.ticket_status.replace(/_/g, ' ');
    this.dataStorage.sync();
    this.chamados = [];
    this.ticketService.getWithStatus(this.dataStorage.ticket.ticket_status, 5, 0).subscribe(retorno => {
      if(retorno['success']==true){
        this.chamados = retorno['data']['ticket']
        this.quantidade = retorno['count'];
      } else {

      }
    }, erro => {

    });
  }

}
