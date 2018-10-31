import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataHoraAgendamentoComponent } from './data-hora-agendamento.component';

describe('DataHoraAgendamentoComponent', () => {
  let component: DataHoraAgendamentoComponent;
  let fixture: ComponentFixture<DataHoraAgendamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataHoraAgendamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataHoraAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
