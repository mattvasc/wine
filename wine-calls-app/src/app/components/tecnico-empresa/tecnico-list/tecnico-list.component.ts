import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../model/tecnico';
import { EmpresaParceira } from 'src/app/model/empresa-parceira';
import { Router } from '@angular/router';
import { DataStorageService } from '../../../service/data-storage.service';
import { TecnicoService } from '../../../service/tecnico.service';

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
    private tecnicoService: TecnicoService
  ) { }

  ngOnInit() {
    if (this.dataStorage.empresa_parceira === undefined) {
      this.router.navigateByUrl('/empresasParceiras');
    }
    this.tecnicos = [];
    this.tecnicoService.getAllofOneCompany(this.dataStorage.empresa_parceira.id).subscribe(result => {
      if (result['success'] !== true) {
        console.log("Erro ao obter listagem de técnicos.");
        this.router.navigateByUrl('/empresasParceiras');
      }
      this.tecnicos = result['data']['tecnico'];
    });
    this.empresa = JSON.parse(window.sessionStorage.getItem('empresa'));
  }

  editTecnico(id: number){
    this.router.navigateByUrl('/formsTecnicoEmpresaParceira/' + id);
  }

  deleteTecnico(id: number){
   // TODO: fazer isso aqui 
  }
}
