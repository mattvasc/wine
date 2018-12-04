import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../../../model/funcionario';

@Component({
  selector: 'app-employee-list-page',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.scss']
})
export class EmployeeListPageComponent implements OnInit {

  public funcionarios: Funcionario[] = [];
  constructor() { }

  ngOnInit() {
  }

}
