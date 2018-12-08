import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEscolherClienteComponent } from './ticket-escolher-cliente.component';

describe('TicketEscolherClienteComponent', () => {
  let component: TicketEscolherClienteComponent;
  let fixture: ComponentFixture<TicketEscolherClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketEscolherClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketEscolherClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
