import { Component, OnInit } from '@angular/core';
import { Masks } from '../../../../masks';
@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  
  private masks: any;
  constructor() {
    this.masks = Masks;
   }

  ngOnInit() {
  }

}
