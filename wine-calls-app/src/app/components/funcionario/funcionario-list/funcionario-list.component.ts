import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../../model/funcionario';
import { FuncionarioService } from '../../../service/funcionario.service';
import { DataStorageService } from '../../../service/data-storage.service';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.scss']
})
export class FuncionarioListComponent implements OnInit {
  
  public funcionarios: Funcionario[] = [];
  constructor(
    public dataStorage: DataStorageService,
    private funcionarioService: FuncionarioService
  ) { }

  ngOnInit() {
    this.dataStorage.sync();
    this.funcionarioService.getAll().subscribe(retorno => {
      console.log(retorno);
      if(retorno['success'] == true)
        this.funcionarios = retorno["data"];
      else 
        alert("Erro ao buscar funcionários ativos no sistema.");
    });
  }

}
