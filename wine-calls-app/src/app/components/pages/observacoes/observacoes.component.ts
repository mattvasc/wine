import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-observacoes',
  templateUrl: './observacoes.component.html',
  styleUrls: ['./observacoes.component.scss']
})
export class ObservacoesComponent implements OnInit {

  @Input() parametro : any;
  @Output() saida: EventEmitter;
  private obstext: string = "";
  constructor() {
    if(this.parametro !== undefined)
      this.obstext = this.parametro;
   }

  ngOnInit() {
  }
  
  onKey(event: any){
    console.log(this.obstext);
    this.saida.emit(this.obstext);
  }

}
