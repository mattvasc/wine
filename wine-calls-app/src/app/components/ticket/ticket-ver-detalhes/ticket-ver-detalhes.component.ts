import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../service/data-storage.service';
import { Ticket } from 'src/app/model/ticket';
import { TicketService } from '../../../service/ticket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';


@Component({
  selector: 'app-ticket-ver-detalhes',
  templateUrl: './ticket-ver-detalhes.component.html',
  styleUrls: ['./ticket-ver-detalhes.component.scss']
})
export class TicketVerDetalhesComponent implements OnInit {
  public chamados: Ticket[];
  public quantidade: number;
  public ticket_status: string;
  public modalWarning: {};
  public ticketSelecionado: number;
  public coisoSelecionado : number = 0;
  public nomedeumavariavel : any;
  public imprimir: any = "";
  constructor(
    public dataStorage: DataStorageService,
    private ticketService: TicketService,
    private modalService: NgbModal,
    private router: Router,
    public api : ApiService,
  ) { }

  open(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then(() => {
    }, () => {});
  }

  editTicket(index: number){
    this.router.navigateByUrl('/formsTicket');
    console.log(this.chamados[index]);
    this.dataStorage.ticket = this.chamados[index];
    this.dataStorage.cliente = this.dataStorage.ticket.cliente;
    this.dataStorage.ticket.estagio = 2;
    this.dataStorage.save();
  }

  ngOnInit() {

    this.modalWarning = {};
    this.modalWarning['title'] = '';
    this.modalWarning['message'] = '';
    this.ticket_status = this.dataStorage.ticket.ticket_status.replace(/_/g, ' ');
    this.dataStorage.sync();
    this.chamados = [];
    this.ticketService.getFullWithStatus(this.dataStorage.ticket.ticket_status, 5, 0).subscribe(retorno => {
      if(retorno['success']==true){
        this.chamados = retorno['data']['ticket']
        this.quantidade = retorno['count'];
      } else {

      }
    }, erro => {

    });
  }

  uploadOrdem(index) {
    this.coisoSelecionado =index;
    document.getElementById('uploadDeOrdemDeArquivoDoTecnico').click();
    // this.ticketService.
  }

  submeterForm(event: any) {
    console.log(event);
    // document.getElementById('botaoSubmterForm').click();
    this.ticketService.upload(event.target.files[0], this.chamados[this.coisoSelecionado].ticket_id).subscribe(ret => {
      this.chamados.splice(this.coisoSelecionado, 1);
      this.modalWarning['message'] = 'Evidencia salva com sucesso!';
      this.modalWarning['title'] = 'Sucesso!';
      document.getElementById('openGenericModal').click();
    }, err => {
      this.modalWarning['message'] = 'Erro ao fazer upload do arquivo!';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
      console.log(err)
    });
  }

  seeTicket(id: number) {
    this.ticketSelecionado = id;
    let temp: {} = this.chamados[this.ticketSelecionado];
    // temp.splice('Createdat',1);
    delete temp['Updatedat'];
    delete temp['Cliente'];
    delete temp['Tecnico'];
    delete temp['preco_tecnico'];
    delete temp['check_docs'];
    delete temp['check_pgto_cliete'];
    delete temp['check_pgto_tecnico'];



    this.imprimir = Object.keys(temp).map
     (function(key){
       if(temp[key] !== undefined && temp[key] != null)
        return key.replace('_',' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})+ ": " + temp[key];
      else
      return undefined;

}).join("<br>");
this.imprimir = this.imprimir.replace(/<br><br>/g, "<br>");
document.getElementById('openGenericModal2').click();

  }

  cancelarTicket(index : number) {
    this.ticketSelecionado = index;

    if (this.chamados[index].ticket_status == "em_atendimento") {
      this.chamados[index].ticket_status = "encerrado_com_insucesso";
    }  else {
      this.chamados[index].ticket_status = "cancelado";
    }
    this.encerrarChamado();
  }
  concluirTicket(index: number) {
    console.log(index);
    console.log(this.chamados);
    this.ticketSelecionado = index;;
    this.chamados[index].ticket_status = "encerrado_com_sucesso";
    this.encerrarChamado();
  }

  downloadOrdem(index : number) {
    this.ticketService.baixarPDF(this.chamados[index]).subscribe(retorno => {
      const file = new Blob([retorno], {type: 'application/pdf'});
      const fileURL = window.URL.createObjectURL(file);
      window.location.href = fileURL;

    }, () => {
      this.modalWarning['message'] = 'Erro ao gerar Ordem de Serviço';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
    });
  }
  downloadEvidencia(index: number) {
    this.ticketService.baixarEvidencia(this.chamados[index].ticket_id).subscribe(retorno => {
      const file = new Blob([retorno], {type: 'application/pdf'});
      const fileURL = window.URL.createObjectURL(file);
      window.location.href = fileURL;
    }
    , () => {
      this.modalWarning['message'] = 'Erro ao buscar Ordem de Serviço';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
    })
  }

  encerrarChamado() {
   

    let ticketApagar = this.chamados[this.ticketSelecionado];
    console.log(ticketApagar);

    this.ticketService.update(ticketApagar).subscribe(success => {
      if( success['success'] == true) {
        this.modalWarning['message'] = 'Ticket encerrado com sucesso!';
        this.modalWarning['title'] = 'Sucesso!';
        document.getElementById('openGenericModal').click();
        this.chamados.splice(this.ticketSelecionado,1);
      } else {
        this.modalWarning['message'] = 'Erro Interno!';
        this.modalWarning['title'] = 'Erro!';
        document.getElementById('openGenericModal').click();
      }

    }, failure => {
      console.log(failure);
      this.modalWarning['message'] = 'Falha ao encerrar Ticket';
      this.modalWarning['title'] = 'Erro!';
      document.getElementById('openGenericModal').click();
    });
  }
}
