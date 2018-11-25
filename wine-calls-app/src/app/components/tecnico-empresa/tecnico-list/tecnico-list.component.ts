import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../model/tecnico';
import { EmpresaParceira } from 'src/app/model/empresa-parceira';
import { Router } from '@angular/router';
import { DataStorageService } from '../../../service/data-storage.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.scss']
})
export class TecnicoListComponent implements OnInit {
  private tecnicos: Tecnico[];
  private empresa: EmpresaParceira;
  constructor(
    public dataStorage: DataStorageService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.dataStorage.empresa_parceira === undefined) {
      this.router.navigateByUrl('/empresasParceiras');
    }
    this.tecnicos = [];
    this.empresa = JSON.parse(window.sessionStorage.getItem('empresa'));
  }
}
