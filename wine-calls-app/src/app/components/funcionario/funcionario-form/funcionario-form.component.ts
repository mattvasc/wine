import { Component, OnInit } from '@angular/core';
import { Masks } from '../../../masks';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent implements OnInit {

  public masks = Masks;
  constructor() { }

  ngOnInit() {
  }

}
