import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAgendamentoComponent } from './ticket-agendamento.component';

describe('TicketAgendamentoComponent', () => {
  let component: TicketAgendamentoComponent;
  let fixture: ComponentFixture<TicketAgendamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketAgendamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
