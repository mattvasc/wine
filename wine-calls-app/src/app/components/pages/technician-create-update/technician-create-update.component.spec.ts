import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianCreateUpdateComponent } from './technician-create-update.component';

describe('TechnicianCreateUpdateComponent', () => {
  let component: TechnicianCreateUpdateComponent;
  let fixture: ComponentFixture<TechnicianCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
