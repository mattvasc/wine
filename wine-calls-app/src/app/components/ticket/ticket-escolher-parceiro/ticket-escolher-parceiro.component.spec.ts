import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEscolherParceiroComponent } from './ticket-escolher-parceiro.component';

describe('TicketEscolherParceiroComponent', () => {
  let component: TicketEscolherParceiroComponent;
  let fixture: ComponentFixture<TicketEscolherParceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketEscolherParceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketEscolherParceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
