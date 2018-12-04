import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    // Tá sendo armazenado no sessionStorage e não no localStorage
    // localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
  goToAddTicketPage() {
    this.router.navigate(['/formsTicket']);
  }
}
