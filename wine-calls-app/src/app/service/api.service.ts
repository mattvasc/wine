import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {  HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})



export class ApiService {


  constructor(private http: HttpClient) {  }


  public apiUrl = 'http://localhost:3000/';

  buscaCep(cep: String){
    cep = cep.replace('-','');
    if(cep.length === 8 )
      return this.http.get<any>('https://viacep.com.br/ws/' + cep + '/json/');
    return null;
  }

  validarCPF(cpf) {
    if(cpf === undefined || cpf === null)
      return false;
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf == '') return false;

    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999")
        return false;
    // Valida 1o digito
    let add = 0;
    for (let i=0; i < 9; i ++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
      return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i ++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
      return false;
    return true;
  }

  validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0,tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    let resultado;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;

    return true;
  }

  verificaDataExpedicao(datanasc, dataexp){
    if(datanasc.replace(/[^\d]+/g,'') < 8 || dataexp.replace(/[^\d]+/g,'') < 8)
      return false;

    if(!this.verificaDataAtual(dataexp))
      return false;

    let data1aux = datanasc.split("-");
    let data2aux = dataexp.split("-");
    let nasc = new Date(data1aux[0], data1aux[1]-1, data1aux[2]);
    let exp = new Date(data2aux[0], data2aux[1]-1, data2aux[2]);

    if(nasc <= exp)
        return true;
    return false;
  }

  verificaDataAtual(data){
    if(data.replace(/[^\d]+/g,'') < 8)
      return false;

    let dataux = data.split("-");
    let d = new Date(dataux[0], dataux[1]-1, dataux[2]);
    let today = new Date();

    if(d <= today)
      return true;
    return false;
  }

  getPaginate(name: String, limit: number, offset: number) {
    console.log(this.apiUrl + `${name}/limit/${limit}/offset/${offset}`);
    return this.http.get<any>(this.apiUrl + `${name}/limit/${limit}/offset/${offset}`);
  }
}
