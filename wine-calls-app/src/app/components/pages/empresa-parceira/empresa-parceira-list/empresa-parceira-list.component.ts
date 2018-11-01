import { Component, OnInit } from '@angular/core';
import { EmpresaParceira } from '../../../../model/empresa-parceira';
import { Router } from '@angular/router';
import { EmpresaParceiraService } from 'src/app/service/empresa-parceira.service';

@Component({
  selector: 'app-empresa-parceira-list',
  templateUrl: './empresa-parceira-list.component.html',
  styleUrls: ['./empresa-parceira-list.component.scss']
})
export class EmpresaParceiraListComponent implements OnInit {

  constructor(private api: EmpresaParceiraService, private router: Router) { }
  empresas_parceiras: EmpresaParceira[] = [];
  ngOnInit() {
    this.getEmpresasParceiras();
  }

  getEmpresasParceiras() {
    this.api.getAll().subscribe(c => {
      if(c['data']["empresa_parceira"]!== undefined)
        this.empresas_parceiras = c['data']['empresa_parceira']
    });
  }

  editEmpresaParceira(id: number) {
    this.router.navigateByUrl(`/formsEmpresaParceira/${id}`);
  }

  deleteEmpresaParceira(id: number) {
    console.log(`Indo apagar o cliente ${id}`);
    this.api.delete(id).subscribe(c => {
      console.log(c)
      alert("Empresa apagada com sucesso!");
      window.location.reload();
    });
  }
}
