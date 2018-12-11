import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticket.service';
import { Router } from '@angular/router';
import { DataStorageService } from '../../service/data-storage.service';
import { Ticket } from 'src/app/model/ticket';
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
  constructor(private api: TicketService,
    public dataStorage: DataStorageService,
    private router: Router) { }

  ngOnInit() {
    this.dataStorage.sync();
    this.api.getCountStatus().subscribe(retorno => {
      if (retorno['success'] === true) {
        for(let i = 0; i < retorno['data'].length; i++) {
          this.contadores[retorno['data'][i]['ticket_status']] = retorno['data'][i]['count'];
        }
      }
      console.log(retorno);
    });
  }

  detalhes(status: string){
    this.dataStorage.ticket = new Ticket();
    this.dataStorage.ticket.ticket_status = status;
    this.dataStorage.save();
    this.router.navigateByUrl('/chamados/detalhes');
  }

}
