import { TestBed } from '@angular/core/testing';

import { ClienteQuestionService } from './cliente-question.service';

describe('ClienteQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteQuestionService = TestBed.get(ClienteQuestionService);
    expect(service).toBeTruthy();
  });
});
