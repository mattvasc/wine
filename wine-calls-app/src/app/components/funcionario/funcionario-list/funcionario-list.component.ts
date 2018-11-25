import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../../model/funcionario';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.scss']
})
export class FuncionarioListComponent implements OnInit {

  public funcionarios: Funcionario[] = [];
  constructor() { }

  ngOnInit() {
  }

}
