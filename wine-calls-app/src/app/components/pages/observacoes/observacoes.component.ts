import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-observacoes',
  templateUrl: './observacoes.component.html',
  styleUrls: ['./observacoes.component.scss']
})
export class ObservacoesComponent implements OnInit {

  @Input() parametro : any;

  constructor() { }

  ngOnInit() {
  }

}
