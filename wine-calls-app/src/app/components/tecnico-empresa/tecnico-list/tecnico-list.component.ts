import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../model/tecnico';
import { EmpresaParceira } from 'src/app/model/empresa-parceira';
import { Router } from '@angular/router';
import { DataStorageService } from '../../../service/data-storage.service';
import { TecnicoService } from '../../../service/tecnico.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.scss']
})
export class TecnicoListComponent implements OnInit {
  public modalWarning: {};
  public closeResult;

  private tecnicos: Tecnico[];
  private empresa: EmpresaParceira;
  constructor(
    public dataStorage: DataStorageService,
    private router: Router,
    private tecnicoService: TecnicoService,
    private modalService: NgbModal
  ) { }

  open(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngOnInit() {
    this.modalWarning = {};
    this.modalWarning['title'] = '';
    this.modalWarning['message'] = '';

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
        this.modalWarning['message'] = 'Técnico Apagado com Sucesso!';
        this.modalWarning['title'] = 'Sucesso!';
        document.getElementById('openGenericModal').click();
      } else {
        console.log(c);
        this.modalWarning['message'] = 'Erro ao Apagar Tecnico';
        this.modalWarning['title'] = 'Erro!';
        document.getElementById('openGenericModal').click();
      }
    }, c => {
      console.log(c);
      this.modalWarning['message'] = 'Erro ao Apagar Tecnico';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
    });
  }
}
