import { Component, OnInit } from '@angular/core';
import { EmpresaParceira } from '../../../../model/empresa-parceira';
import { Router } from '@angular/router';
import { EmpresaParceiraService } from 'src/app/service/empresa-parceira.service';
import { DataStorageService } from '../../../../service/data-storage.service';

@Component({
  selector: 'app-partner-company-list-page',
  templateUrl: './partner-company-list-page.component.html',
  styleUrls: ['./partner-company-list-page.component.scss']
})
export class PartnerCompanyListPageComponent implements OnInit {

  constructor(private api: EmpresaParceiraService, private router: Router, public dataStorage: DataStorageService) { }
  empresas_parceiras: EmpresaParceira[] = [];
  ngOnInit() {
    this.getEmpresasParceiras();
  }

  getEmpresasParceiras() {
    this.api.getAll().subscribe(c => {
      if (c['data']['empresa_parceira'] !== undefined) {
        this.empresas_parceiras = c['data']['empresa_parceira'];
      }
    });
  }

  editEmpresaParceira(id: number) {
    this.router.navigateByUrl(`/formsEmpresaParceira/${id}`);
  }

  editFuncionariosEmpresaParceira(id: number) {
    this.dataStorage.empresa_parceira = this.empresas_parceiras[id];
    this.router.navigateByUrl(`/tecnicos`);
  }
  deleteEmpresaParceira(id: number) {
    console.log(`Indo apagar o cliente ${id}`);
    this.api.delete(id).subscribe(c => {
      console.log(c);
      alert('Empresa apagada com sucesso!');
      window.location.reload();
    });
  }
}
