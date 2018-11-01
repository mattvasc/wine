import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-email-telefone',
  templateUrl: './email-telefone.component.html',
  styleUrls: ['./email-telefone.component.scss']
})
export class EmailTelefoneComponent implements OnInit {
  @Input() parametro: any;
  constructor() { }

  ngOnInit() {
    console.log(this.parametro);
  }

}
