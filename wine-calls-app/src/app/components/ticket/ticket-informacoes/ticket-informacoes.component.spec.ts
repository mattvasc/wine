import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketInformacoesComponent } from './ticket-informacoes.component';

describe('TicketInformacoesComponent', () => {
  let component: TicketInformacoesComponent;
  let fixture: ComponentFixture<TicketInformacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketInformacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketInformacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
