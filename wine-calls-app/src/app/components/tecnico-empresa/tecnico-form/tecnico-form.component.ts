import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../model/tecnico';
import { DataStorageService } from '../../../service/data-storage.service';
import { TecnicoService } from '../../../service/tecnico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-form',
  templateUrl: './tecnico-form.component.html',
  styleUrls: ['./tecnico-form.component.scss']
})
export class TecnicoFormComponent implements OnInit {
  public tecnicoAtual: Tecnico;
  public cadastrar = true;

  constructor(
    private router: Router,
    public dataStorage: DataStorageService,
    private tecnicoService: TecnicoService
  ) { }

  ngOnInit() {
    this.dataStorage.sync();
    if (this.dataStorage.empresa_parceira === undefined) {
      this.router.navigateByUrl('/empresasParceiras');
    }

    if (this.dataStorage.tecnico !== undefined) {
      this.tecnicoAtual = this.dataStorage.tecnico;
      this.cadastrar = false;
    } else {
      this.tecnicoAtual = new Tecnico();
    }
  }
  exec() {
    if (this.cadastrar)
      this.salvar();
    else
      this.atualizar();
  }
  salvar(){

  }
  atualizar(){

  }
}
