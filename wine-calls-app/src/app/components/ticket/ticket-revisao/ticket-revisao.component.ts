import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../service/data-storage.service';
import { Ticket } from 'src/app/model/ticket';
import { TicketService } from '../../../service/ticket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ticket-revisao',
  templateUrl: './ticket-revisao.component.html',
  styleUrls: ['./ticket-revisao.component.scss']
})
export class TicketRevisaoComponent implements OnInit {

  public modalWarning: {};
  public closeResult;

  constructor(
    public dataStorage: DataStorageService,
    private ticketService: TicketService,
    private modalService: NgbModal
  ) { }

  open(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngOnInit() {
    this.modalWarning = {};
    this.modalWarning['title'] = '';
    this.modalWarning['message'] = '';

    this.dataStorage.sync();
    console.log(this.dataStorage.ticket);
  }
  voltar() {
    this.dataStorage.ticket.estagio = this.dataStorage.ticket.estagio - 2;
    this.dataStorage.save();
  }
  salvar() {
    if (this.dataStorage.ticket.data_inicio && this.dataStorage.tecnico) {

      let today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
      let agendado = formatDate(this.dataStorage.ticket.data_inicio, 'yyyy-MM-dd', 'en-US');

      if (today == agendado)
        this.dataStorage.ticket.ticket_status = "em_atendimento";
      else
        this.dataStorage.ticket.ticket_status = "agendado";
      this.dataStorage.ticket['email_tecnico'] = this.dataStorage.tecnico.email;

      this.dataStorage.ticket['tecnico_nome'] = this.dataStorage.tecnico.nome;
      this.dataStorage.ticket['cliente_nome'] = this.dataStorage.cliente.razao_social;
    }
    else
      this.dataStorage.ticket.ticket_status = "aberto";

    this.ticketService.create(this.dataStorage.ticket).subscribe(success => {
      if( success['success'] == true) {
        this.modalWarning['message'] = 'Ticket Salvo com Sucesso!';
        this.modalWarning['title'] = 'Sucesso!';
        document.getElementById('openGenericModal').click();
      } else {
        this.modalWarning['message'] = 'Erro Interno!';
        this.modalWarning['title'] = 'Erro!';
        document.getElementById('openGenericModal').click();
      }

    }, failure => {
      console.log(failure);
      this.modalWarning['message'] = 'Falha ao salvar Ticket';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
    });
  }
}
