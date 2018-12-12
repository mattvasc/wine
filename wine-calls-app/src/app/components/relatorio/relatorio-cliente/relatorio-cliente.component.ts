import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../service/cliente.service';
import { DataStorageService } from '../../../service/data-storage.service';
import { Cliente } from '../../../model/cliente';
import { debounceTime } from 'rxjs/operators';  

@Component({
  selector: 'app-relatorio-cliente',
  templateUrl: './relatorio-cliente.component.html',
  styleUrls: ['./relatorio-cliente.component.scss']
})
export class RelatorioClienteComponent implements OnInit {
  public clientesPesquisados: Cliente[];
  public nome_input_string: String;

  constructor(
    private clienteService: ClienteService,
    private dataStorage: DataStorageService
  ) {

  }
  ngOnInit() {
  }

  selectClient(index: number) {
    // fazer algo com this.clientesPesquisados[index]
    alert("Falta agora só papapum");
  }
  pesquisar() {
    this.clienteService.getWithNamePaginated(this.nome_input_string, 5, 0)
      .pipe(debounceTime(50000))
      .subscribe(x => {
        if (x['success'] == true)
          this.clientesPesquisados = x['data']['cliente'];
      });
  }
}
