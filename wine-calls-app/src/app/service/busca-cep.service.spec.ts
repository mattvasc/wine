import { TestBed } from '@angular/core/testing';

import { BuscaCepService } from './busca-cep.service';

describe('BuscaCepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuscaCepService = TestBed.get(BuscaCepService);
    expect(service).toBeTruthy();
  });
});
