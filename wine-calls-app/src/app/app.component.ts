
import { Component } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title = 'Wine Tickets';
  constructor(private router: Router) {
  }
  logOut() {
    //Tá sendo armazenado no sessionStorage e não no localStorage
    //localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
