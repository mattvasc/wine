import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { QuestionBase }              from '../question-base';
import { QuestionControlService }    from '../question-control.service';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ QuestionControlService ]
})

export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  @Input() isSalvar: boolean;
  @Input() bindTo: any;
  @Output() submitEvent = new EventEmitter();
  
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    //this.payLoad = JSON.stringify(this.form.value);
    this.submitEvent.emit(this.form.value);
  }
}