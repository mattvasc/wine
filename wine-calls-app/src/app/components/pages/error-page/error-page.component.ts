import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  defaultNotFoundError: Object =  {
    status: 404,
    title: 'Página não encontrada',
    message: 'A página que você está procurando não foi encontrada ou não está acessível no momento.'
  };

  errorStatus: Object = {};

  constructor(private route: ActivatedRoute) {
    const statusParam = this.route.snapshot.params['status'];
    this.errorStatus = this.getMappedError(statusParam) || this.defaultNotFoundError;
  }

  ngOnInit() {
  }

  // TODO: mapear os erros
  getMappedError(status: number) {
    return status ? {
      status,
      title: null,
      message: null
    } : null;
  }

}
