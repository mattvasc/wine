import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianFormPageComponent } from './technician-form-page.component';

describe('TechnicianFormPageComponent', () => {
  let component: TechnicianFormPageComponent;
  let fixture: ComponentFixture<TechnicianFormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianFormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
