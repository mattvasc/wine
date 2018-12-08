import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../service/data-storage.service';
import { Ticket } from 'src/app/model/ticket';
@Component({
  selector: 'app-ticket-informacoes',
  templateUrl: './ticket-informacoes.component.html',
  styleUrls: ['./ticket-informacoes.component.scss']
})
export class TicketInformacoesComponent implements OnInit {

  constructor(public dataStorage: DataStorageService) { }

  ngOnInit() {
    this.dataStorage.sync();
  }
  voltar() {
    delete this.dataStorage.cliente;
    this.dataStorage.ticket = new Ticket();
    this.dataStorage.ticket.estagio = 1;
    this.dataStorage.save();
  }
  avancar(){
    this.dataStorage.ticket.logradouro = this.dataStorage.cliente.logradouro;
    this.dataStorage.ticket.logradouro_numero = this.dataStorage.cliente.logradouro_numero;
    this.dataStorage.ticket.cep = this.dataStorage.cliente.cep;
    this.dataStorage.ticket.bairro = this.dataStorage.cliente.bairro;
    this.dataStorage.ticket.cidade = this.dataStorage.cliente.cidade;
    this.dataStorage.ticket.estado = this.dataStorage.cliente.estado;
    this.dataStorage.ticket.email_contato = this.dataStorage.cliente.email;
    this.dataStorage.ticket.estagio = this.dataStorage.ticket.estagio + 1;
    this.dataStorage.save();
  }
}
