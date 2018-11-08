import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parceiro-form',
  templateUrl: './parceiro-form.component.html',
  styleUrls: ['./parceiro-form.component.scss']
})
export class ParceiroFormComponent implements OnInit {
 
  public isPJ: String;
  public teste: String;
  
  constructor() { }
 
  ngOnInit() {
    this.isPJ = 'pessoaJuridica';
  }

}
