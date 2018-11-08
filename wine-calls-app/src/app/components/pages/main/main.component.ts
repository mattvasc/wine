import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../service/ticket.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private contadores = 
    { 'aberto': 0 ,
     'agendado': 0 ,
     'em-atendimento': 0 ,
     'entregue': 0 ,
     'encerrado-com-sucesso': 0 ,
     'encerrado-com-insucesso': 0 ,
     'cancelado': 0 };
  constructor(private api: TicketService) { }

  ngOnInit() {
    this.api.getCountStatus().subscribe(retorno => {
      if (retorno['success'] === true) {
        for(let i = 0; i < retorno['data'].length; i++) {
          this.contadores[retorno['data'][i]['ticket_status']] = retorno['data'][i]['count'];
        }
      }
      console.log(retorno);
    });
  }

}
