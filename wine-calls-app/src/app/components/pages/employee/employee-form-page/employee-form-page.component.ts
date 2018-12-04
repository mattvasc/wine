import { Component, OnInit } from '@angular/core';
import { Masks } from '../../../../masks';

@Component({
  selector: 'app-employee-form-page',
  templateUrl: './employee-form-page.component.html',
  styleUrls: ['./employee-form-page.component.scss']
})
export class EmployeeFormPageComponent implements OnInit {

  public masks = Masks;
  constructor() { }

  ngOnInit() {
  }

}
