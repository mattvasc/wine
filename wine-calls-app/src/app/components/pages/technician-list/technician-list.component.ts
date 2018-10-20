import { Component, OnInit } from '@angular/core';
import { Technician } from "../../../service/technician";
import { TechnicianService } from "../../../service/technician.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-technician-list',
  templateUrl: './technician-list.component.html',
  styleUrls: ['./technician-list.component.scss']
})
export class TechnicianListComponent implements OnInit {

  constructor(private api: TechnicianService, private router: Router) { }
  technicians: Technician[] = [];
  ngOnInit() {
    this.getTechnicians();
  }

  getTechnicians() {
    this.api.getTechnicians().subscribe(c => this.technicians = c);
  }

  editTechnician(id: number) {
    this.router.navigateByUrl(`/formsTecnico/${id}`);
  }

  deleteTechnician(id: number){
    console.log(`Indo apagar o cliente ${id}`);
    this.api.deleteTechnician(id).subscribe(c => console.log(c));
    // Se deletou com sucesso então affect rows não será igual a zero
  }


}
