import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../service/data-storage.service';
import { Ticket } from 'src/app/model/ticket';
import { TicketService } from '../../../service/ticket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-ver-detalhes',
  templateUrl: './ticket-ver-detalhes.component.html',
  styleUrls: ['./ticket-ver-detalhes.component.scss']
})
export class TicketVerDetalhesComponent implements OnInit {
  public chamados: Ticket[];
  public quantidade: number;
  public ticket_status: string;
  public modalWarning: {};

  constructor(
    public dataStorage: DataStorageService,
    private ticketService: TicketService,
    private modalService: NgbModal
  ) { }

  open(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngOnInit() {

    this.modalWarning = {};
    this.modalWarning['title'] = '';
    this.modalWarning['message'] = '';

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

  seeTicket(id) {
    // $("#idChamado").val(id);
    // $("#detalhesChamado").modal('show');
    console.log(this.chamados[id]);
  }

  encerrarChamado() {
    // let ticketApagar = this.chamados[$("#idChamado").val()];
    let ticketApagar = new Ticket;
    ticketApagar.ticket_status = "encerrado_com_sucesso";

    console.log(ticketApagar);

    this.ticketService.update(ticketApagar).subscribe(success => {
      if( success['success'] == true) {
        this.modalWarning['message'] = 'Ticket encerrado com sucesso!';
        this.modalWarning['title'] = 'Sucesso!';
        document.getElementById('openGenericModal').click();
        // this.chamados.splice($("#idChamado").val(),1);
        // $("#detalhesChamado").modal('hide');
      } else {
        this.modalWarning['message'] = 'Erro Interno!';
        this.modalWarning['title'] = 'Erro!';
        document.getElementById('openGenericModal').click();
      }

    }, failure => {
      console.log(failure);
      this.modalWarning['message'] = 'Falha ao encerrar Ticket';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
    });
  }
}
