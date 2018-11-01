import { Injectable } from '@angular/core';

import { DropdownQuestion } from '../model/question-dropdown';
import { QuestionBase } from '../model/question-base';
import { TextboxQuestion } from '../model/question-textbox';
import { TextareaQuestion } from '../model/question-textarea';


@Injectable({
  providedIn: 'root'
})
export class EmpresaParceiraQuestionService {
  getQuestions() {
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
        key: 'cnpj',
        label: 'CNPJ',
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
        key: 'telefones',
        label: 'Telefones',
        required: false,
        order: 5
      }),
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        required: false,
        order: 6
      }),
      new DropdownQuestion({
        key: 'situacao',
        label: 'Situação',
        options: [
          { key: 'ativo', value: 'Ativo' },
          { key: 'inativo', value: 'Inativo' },
          { key: 'desconhecido', value: 'Desconhecido' },
        ],
        required: true,
        value: 'ativo',
        order: 7
      }),
      new TextareaQuestion({
        key: 'observacoes',
        label: 'Observações',
        required: false,
        order: 8
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}
