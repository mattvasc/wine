import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaParceiraListComponent } from './empresa-parceira-list.component';

describe('EmpresaParceiraListComponent', () => {
  let component: EmpresaParceiraListComponent;
  let fixture: ComponentFixture<EmpresaParceiraListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaParceiraListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaParceiraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
