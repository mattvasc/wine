import { Component } from '@angular/core';
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
