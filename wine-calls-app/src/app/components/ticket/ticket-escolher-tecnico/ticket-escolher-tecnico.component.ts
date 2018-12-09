import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../service/data-storage.service';
import {Tecnico } from '../../../model/tecnico';

@Component({
  selector: 'app-ticket-escolher-tecnico',
  templateUrl: './ticket-escolher-tecnico.component.html',
  styleUrls: ['./ticket-escolher-tecnico.component.scss']
})
export class TicketEscolherTecnicoComponent implements OnInit {
  public tecnicosPesquisados: Tecnico[];
  constructor(
    public dataStorage: DataStorageService
    ) { }

  pesquisar() {
    console.log("//TODO pesquisar()");
  }

  ngOnInit() {
    this.dataStorage.sync();
  }

  seeTechnician(index: number) {

  }

  selectTechnician(index: number) {
    this.dataStorage.empresa_parceira = this.tecnicosPesquisados[index];
    this.avancar();
  }

  voltar() {
    this.dataStorage.ticket.estagio = this.dataStorage.ticket.estagio - 1;
    this.dataStorage.save();
  }
  avancar(){
    this.dataStorage.ticket.estagio = this.dataStorage.ticket.estagio + 1;
    this.dataStorage.save();
  }

}
