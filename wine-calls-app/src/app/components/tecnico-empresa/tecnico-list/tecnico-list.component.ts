import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../model/tecnico';
import { EmpresaParceira } from 'src/app/model/empresa-parceira';
@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.scss']
})
export class TecnicoListComponent implements OnInit {
  private tecnicos: Tecnico[];
  private empresa: EmpresaParceira;
  constructor() { }

  ngOnInit() {
    this.tecnicos = [];
    this.empresa = JSON.parse(window.sessionStorage.getItem('empresa'));
    
  }

}
