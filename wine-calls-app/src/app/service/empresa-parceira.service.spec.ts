import { TestBed } from '@angular/core/testing';

import { EmpresaParceiraService } from './empresa-parceira.service';

describe('EmpresaParceiraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpresaParceiraService = TestBed.get(EmpresaParceiraService);
    expect(service).toBeTruthy();
  });
});
