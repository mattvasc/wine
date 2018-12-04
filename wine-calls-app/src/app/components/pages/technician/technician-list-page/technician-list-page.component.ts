import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../../model/tecnico';
import { EmpresaParceira } from 'src/app/model/empresa-parceira';
import { Router } from '@angular/router';
import { DataStorageService } from '../../../../service/data-storage.service';
import { TecnicoService } from '../../../../service/tecnico.service';

@Component({
  selector: 'app-technician-list-page',
  templateUrl: './technician-list-page.component.html',
  styleUrls: ['./technician-list-page.component.scss']
})
export class TechnicianListPageComponent implements OnInit {
  private tecnicos: Tecnico[];
  private empresa: EmpresaParceira;
  constructor(
    public dataStorage: DataStorageService,
    private router: Router,
    private tecnicoService: TecnicoService
  ) { }

  ngOnInit() {
    this.dataStorage.sync();
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

  editTecnico(index: number){
    this.dataStorage.tecnico = this.tecnicos[index];
    this.dataStorage.save();
    this.router.navigateByUrl('/formsTecnicoEmpresaParceira/');
  }

  newTecnico(){
    this.dataStorage.tecnico = undefined;
    this.dataStorage.save();
    this.router.navigateByUrl('/formsTecnicoEmpresaParceira/');
  }

  deleteTecnico(index: number){
    let id = this.tecnicos[index].id;
    this.tecnicoService.delete(id).subscribe(c => {
      if(c['success']==true) {
        this.tecnicos.splice(index,1);
        alert("Técnico apagado com sucesso!");
      } else {
        console.log(c);
        alert("Erro ao apagar tecnico!!");
      }
    }, c => {
      console.log(c);
      alert("Erro ao apagar tecnico!!");
    });
  }
}
