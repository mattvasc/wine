import { Injectable }       from '@angular/core';

import { DropdownQuestion } from '../model/question-dropdown';
import { QuestionBase } from '../model/question-base';
import { TextboxQuestion } from '../model/question-textbox';
import { TextareaQuestion } from '../model/question-textarea';

@Injectable({
  providedIn: 'root'
})
export class ClienteQuestionService {

  getQuestions(){
    let questions: QuestionBase<any>[] = [
      

      new TextboxQuestion({
        key: 'nome_fantasia',
        label: 'Nome Fantasia',
        required: false,
        order: 1
      }),
      new TextboxQuestion({
        key: 'razao_social',
        label: 'Razão Social',
        required: true,
        order: 2
      }),
      new TextboxQuestion({
        key: 'cpfcnpj',
        label: 'CPF/CNPJ',
        required: true,
        order: 3
      }),
      new TextboxQuestion({
        key: 'nome_para_contato',
        label: 'Nome para Contato',
        required: false,
        order: 4
      }),
      new TextboxQuestion({
        key: 'inscricao_estadual',
        label: 'Inscrição Estadual',
        required: false,
        order: 5
      }),
      new TextboxQuestion({
        key: 'inscricao_municipal',
        label: 'Inscrição Municipal',
        required: false,
        order: 6
      }),
      new TextboxQuestion({
        key: 'telefones',
        label: 'Telefones',
        required: false,
        order: 7
      }),
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        required: false,
        order: 8
      }),
      new TextboxQuestion({
        key: 'nome_comprador',
        label: 'Nome do Comprador',
        required: false,
        order: 9
      }),
      new TextboxQuestion({
        key: 'email_comprador',
        label: 'Email do Comprador',
        required: false,
        order: 10
      }),
      new TextboxQuestion({
        key: 'data_de_fundacao',
        label: 'Data de Fundação',
        required: false,
        order: 11
      }),
      new TextboxQuestion({
        key: 'capital_social_atual',
        label: 'Capital Social Atual',
        required: false,
        order: 12
      }),
      new TextboxQuestion({
        key: 'registro_na_junta',
        label: 'Registro na Junta',
        required: false,
        order: 13
      }),
      new TextboxQuestion({
        key: 'controle_acionario',
        label: 'Controle Acionário',
        required: false,
        order: 14
      }),
      new TextboxQuestion({
        key: 'numero_de_empregados',
        label: 'Número de Empregados',
        required: false,
        order: 15
      }),
      new TextboxQuestion({
        key: 'ramo_de_atividade',
        label: 'Ramo de Atividade',
        required: false,
        order: 16
      }),
      new TextboxQuestion({
        key: 'informacoes_pagamento',
        label: 'Informações de Pagamento',
        required: false,
        order: 17
      }),
      new DropdownQuestion({
        key: 'situacao',
        label: 'Situação',
        options: [
          {key: 'ativo',  value: 'Ativo'},
          {key: 'inativo',  value: 'Inativo'},
          {key: 'desconhecido',   value: 'Desconhecido'},
        ],
        required: true,
        value: 'ativo',
        order: 18
      }),
      new TextareaQuestion({
        key: 'observacoes',
        label: 'Observações',
        required: false,
        order: 19
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}

