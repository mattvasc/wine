import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianListPageComponent } from './technician-list-page.component';

describe('TechnicianListPageComponent', () => {
  let component: TechnicianListPageComponent;
  let fixture: ComponentFixture<TechnicianListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
