import { Component, OnInit } from '@angular/core';
import { EmpresaParceira } from '../../../model/empresa-parceira';
import { EmpresaParceiraService } from '../../../service/empresa-parceira.service';
import { debounceTime } from 'rxjs/operators';
import { DataStorageService } from '../../../service/data-storage.service';


@Component({
  selector: 'app-relatorio-empresa',
  templateUrl: './relatorio-empresa.component.html',
  styleUrls: ['./relatorio-empresa.component.scss']
})
export class RelatorioEmpresaComponent implements OnInit {

  public parceirosPesquisados: EmpresaParceira[];
  public nome_input_string: string;

  constructor(
    private empresaParceiraService: EmpresaParceiraService,
    public dataStorage: DataStorageService
  ) { }

  ngOnInit() {
    this.parceirosPesquisados = [];
  }

  selectPartner(index: number) {
   alert("To do...");
  }

  pesquisar(){
    this.empresaParceiraService.getWithName(this.nome_input_string)
    .pipe(debounceTime(50000))
    .subscribe(x => {
      if(x['success'] == true)
        this.parceirosPesquisados = x['data']['empresa_parceira'];
    });
  }
}
