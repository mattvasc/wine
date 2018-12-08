import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRevisaoComponent } from './ticket-revisao.component';

describe('TicketRevisaoComponent', () => {
  let component: TicketRevisaoComponent;
  let fixture: ComponentFixture<TicketRevisaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketRevisaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketRevisaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
