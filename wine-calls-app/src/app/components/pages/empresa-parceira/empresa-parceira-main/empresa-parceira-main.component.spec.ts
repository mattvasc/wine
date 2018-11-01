import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaParceiraMainComponent } from './empresa-parceira-main.component';

describe('EmpresaParceiraMainComponent', () => {
  let component: EmpresaParceiraMainComponent;
  let fixture: ComponentFixture<EmpresaParceiraMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaParceiraMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaParceiraMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
