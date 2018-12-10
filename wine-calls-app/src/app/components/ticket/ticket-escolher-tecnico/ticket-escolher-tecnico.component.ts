import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../service/data-storage.service';
import { Tecnico } from '../../../model/tecnico';
import { TecnicoService } from '../../../service/tecnico.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-escolher-tecnico',
  templateUrl: './ticket-escolher-tecnico.component.html',
  styleUrls: ['./ticket-escolher-tecnico.component.scss']
})
export class TicketEscolherTecnicoComponent implements OnInit {
  public tecnicosPesquisados: Tecnico[];
  public nome_input_string: string;

  constructor(
    private tecnicoService: TecnicoService,
    public dataStorage: DataStorageService
    ) { }

    pesquisar(){
      this.tecnicoService.getofOneCompany(this.dataStorage.empresa_parceira.id, this.nome_input_string)
      .pipe(debounceTime(50000))
      .subscribe(x => {
        console.log(x['data']);
        if(x['success'] == true)
          this.tecnicosPesquisados = x['data']['tecnico'];
      });
    }

  ngOnInit() {
    this.dataStorage.sync();
    this.tecnicosPesquisados = [];
  }

  seeTechnician(index: number) {

  }

  selectTechnician(index: number) {
    this.dataStorage.tecnico = this.tecnicosPesquisados[index];
    this.dataStorage.ticket.tecnico_id = this.dataStorage.tecnico.id;
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
