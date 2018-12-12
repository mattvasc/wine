import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../service/data-storage.service';
import { Ticket } from 'src/app/model/ticket';

@Component({
  selector: 'app-chamado',
  templateUrl: './chamado.component.html',
  styleUrls: ['./chamado.component.scss']
})
export class ChamadoComponent implements OnInit {

  constructor(
    public dataStorage: DataStorageService

  ) { }

  ngOnInit() {
    this.dataStorage.sync();
    if(this.dataStorage.ticket == undefined) {
      this.dataStorage.ticket = new Ticket();
      this.dataStorage.ticket['estagio'] = 1;
      this.dataStorage.save();
    }
  }

}
