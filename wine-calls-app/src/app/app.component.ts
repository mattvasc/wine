/*import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

interface AppState {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wine-calls-app';

  message$: Observable<string>

  constructor(private store: Store<AppState>) {
    this.message$ = this.store.pipe(select('message'));
  }

  sayHi() {
    this.store.dispatch({ type: 'HELLO' })
  }
}
*/
import { Component }       from '@angular/core';

import { QuestionService } from './model_questions/question.service';

@Component({
  selector: 'app-root',
  /*template: `
    <div>
      <h2>Job Application for Heroes</h2>
      <app-dynamic-form [questions]="questions"></app-dynamic-form>
      </div>
      `,
      providers:  [QuestionService],
      */
  templateUrl: 'app.component.html'
})
export class AppComponent {
  questions: any[];

  constructor(/*service: QuestionService*/) {
   // this.questions = service.getQuestions();
  }
}