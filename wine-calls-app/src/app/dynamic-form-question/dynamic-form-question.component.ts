import { Component, Input, OnInit } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { QuestionBase }     from '../question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})

export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  @Input() bindTo: any;
  get isValid() { return this.form.controls[this.question.key].valid; }
}