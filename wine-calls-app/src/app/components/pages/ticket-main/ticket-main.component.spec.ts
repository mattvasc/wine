import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMainComponent } from './ticket-main.component';

describe('TicketMainComponent', () => {
  let component: TicketMainComponent;
  let fixture: ComponentFixture<TicketMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
