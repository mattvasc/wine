import { Component, OnInit } from '@angular/core';
import { EmpresaParceira } from '../../../model/empresa-parceira';
import { Router } from '@angular/router';
import { EmpresaParceiraService } from 'src/app/service/empresa-parceira.service';
import { DataStorageService } from '../../../service/data-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-empresa-parceira-list',
  templateUrl: './empresa-parceira-list.component.html',
  styleUrls: ['./empresa-parceira-list.component.scss']
})
export class EmpresaParceiraListComponent implements OnInit {


  public modalWarning: {};
  public closeResult;

  constructor(
    private api: EmpresaParceiraService,
    private router: Router,
    public dataStorage: DataStorageService,
    private modalService: NgbModal
    ) { }

  open(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  empresas_parceiras: EmpresaParceira[] = [];
  ngOnInit() {
    this.modalWarning = {};
    this.modalWarning['title'] = '';
    this.modalWarning['message'] = '';

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
  deleteEmpresaParceira(index: number) {
    let id = this.empresas_parceiras[index].id;
    console.log(`Indo apagar a empresa ${id}`);
    this.api.delete(id).subscribe(c => {
      if(c['success'] == true) {
        this.empresas_parceiras.splice(index,1);
        this.modalWarning['message'] = 'Empresa apagada com sucesso!';
        this.modalWarning['title'] = 'Sucesso!';
        document.getElementById('openGenericModal').click();
        //alert('Empresa apagada com sucesso!');
      } else{
        console.log(c);
        this.modalWarning['message'] = 'Erro ao apagar Empresa Parceira!';
        this.modalWarning['title'] = 'Erro!';
        document.getElementById('openGenericModal').click();
        //alert("Erro ao apagar Empresa Parceira!");
      }
    }, c => {
      console.log(c);
      this.modalWarning['message'] = 'Erro ao apagar Empresa Parceira!';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
      //alert("Erro ao apagar Empresa Parceira!");
    });
  }
}
