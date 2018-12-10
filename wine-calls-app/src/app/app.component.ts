
import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { DataStorageService } from './service/data-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit  {
  title = 'Wine Tickets';
  constructor(
    private router: Router,
    public dataStorage: DataStorageService
    ) {
      
      
  }

  ngOnInit() {
    this.dataStorage.sync();

  }
  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');

  }

  mudarRota(rota: string){
    this.dataStorage.resetAndKeepSession();
    this.router.navigateByUrl(rota);
  }
}
