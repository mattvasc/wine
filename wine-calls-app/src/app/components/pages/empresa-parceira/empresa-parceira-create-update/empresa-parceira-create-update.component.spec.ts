import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaParceiraCreateUpdateComponent } from './empresa-parceira-create-update.component';

describe('EmpresaParceiraCreateUpdateComponent', () => {
  let component: EmpresaParceiraCreateUpdateComponent;
  let fixture: ComponentFixture<EmpresaParceiraCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaParceiraCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaParceiraCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
