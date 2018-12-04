import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCompanyPageComponent } from './partner-company-page.component';

describe('PartnerCompanyPageComponent', () => {
  let component: PartnerCompanyPageComponent;
  let fixture: ComponentFixture<PartnerCompanyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerCompanyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerCompanyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
