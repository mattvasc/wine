import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketVerDetalhesComponent } from './ticket-ver-detalhes.component';

describe('TicketVerDetalhesComponent', () => {
  let component: TicketVerDetalhesComponent;
  let fixture: ComponentFixture<TicketVerDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketVerDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketVerDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
