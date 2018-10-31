import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAtivoInativoComponent } from './status-ativo-inativo.component';

describe('StatusAtivoInativoComponent', () => {
  let component: StatusAtivoInativoComponent;
  let fixture: ComponentFixture<StatusAtivoInativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusAtivoInativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAtivoInativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
