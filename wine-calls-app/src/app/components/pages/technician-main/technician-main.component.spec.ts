import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianMainComponent } from './technician-main.component';

describe('TechnicianMainComponent', () => {
  let component: TechnicianMainComponent;
  let fixture: ComponentFixture<TechnicianMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
