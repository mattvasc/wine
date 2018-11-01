import { TestBed } from '@angular/core/testing';

import { EmpresaParceiraQuestionService } from './empresa-parceira-question.service';

describe('EmpresaParceiraQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpresaParceiraQuestionService = TestBed.get(EmpresaParceiraQuestionService);
    expect(service).toBeTruthy();
  });
});
