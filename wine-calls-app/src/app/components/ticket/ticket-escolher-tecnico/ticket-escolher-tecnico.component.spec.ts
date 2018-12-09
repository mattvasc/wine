import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEscolherTecnicoComponent } from './ticket-escolher-tecnico.component';

describe('TicketEscolherTecnicoComponent', () => {
  let component: TicketEscolherTecnicoComponent;
  let fixture: ComponentFixture<TicketEscolherTecnicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketEscolherTecnicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketEscolherTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
