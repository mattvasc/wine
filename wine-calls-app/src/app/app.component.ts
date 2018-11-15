
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
    // TODO: Apagar sessões locais do window.sessionStorage
    this.router.navigateByUrl('/login');
  }
}