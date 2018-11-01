import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {
  @Input() parametro: any;
  constructor() { }

  ngOnInit() {
    console.log("%%%%%%%%%%%%%%%%%");
    console.log(this.parametro);
    console.log("%%%%%%%%%%%%%%%%%");
  }

}
